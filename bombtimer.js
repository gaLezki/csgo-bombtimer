var http = require('http');
var _socket;

port = 3000;
host = '127.0.0.1';
app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var eventInfo = '';

    req.on('data', function (data) {
        eventInfo += processPayload(JSON.parse(data.toString()));
    });

    req.on('end', function () {
        if (eventInfo !== '') {
            console.log(eventInfo);
        }
        res.end('');
    });
});
io = require('socket.io')(app);
io.on('connection', function (socket) {
    _socket = socket;
});

/**
 * Processes payloads to parse game events
 *
 * @param object Payload as JSON object
 * @return string
 */
function processPayload(data) {
    var date = new Date(data.provider.timestamp * 1000),
    output = '';

    // Handlings for the bomb plant events
    if (readProperty(data, 'added.round.bomb') === true)
    {
        output += 'The bomb has been planted!';
        _socket.emit('bomb_planted');
    } else if (readProperty(data, 'previously.round.bomb') === "planted") {
        if (readProperty(data, 'round.phase') === "over" && readProperty(data, 'round.win_team') === "CT")
        {
            output += 'The bomb has been defused!';
            _socket.emit('bomb_defused');
        }
        else
        {
            output += 'Terrorists won the round with the bomb still ticking!';
            _socket.emit('round_over');
        }
    }

    if (output.length > 0) {
        output = '[' + date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            ('00' + date.getMinutes()).substr(-2) + '] ' +
            output;
    }
    return output;
}

/**
 * Helper function to read values under nested paths from objects
 *
 * @param object
 * @param string Dot separated path to the desired property in the object
 * @return mixed Null if the object has no requested property, property value otherwise
 */
function readProperty(object, property) {
    var value = null,
        properties = property.split('.');

    for (var i = 0; i < properties.length; i++) {
        if (!object.hasOwnProperty(properties[i])) {
            return null;
        }
        value = object[properties[i]];
        object = object[properties[i]];
    }

    return value;
}

app.listen(port, host);

console.log('Monitoring CS:GO rounds');
