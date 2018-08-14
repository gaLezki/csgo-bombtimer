# csgo-bombtimer

This timer is made only for casting and observing purposes to be seen by viewers in the top of the screen. The purpose of this timer is to give some kind of visual indicator about the remaining time without destroying the hype by letting people know if there is no time left for defuse.

**There is no use for using this if you intend to play with a bomb timer. Just use the [10 Second Warning Music](https://www.youtube.com/watch?v=WJE9mtatb3I) instead. CSGO makes a random delay for bomb plant signal to prevent abusing it for timer purposes unless you're a spectator.**

I used [Tsuriga's](https://github.com/tsuriga) [Game State Integration Quick Start Guide](https://github.com/tsuriga/csgo-gsi-qsguide) as a template when I started to figure out how to work with the game state integration.

And to be honest this is also a some kind of rip-off from one of the huds that PGL used at some point. 

# The looks

It's basically a thin line in the top of the screen that starts to shrink from both ends. During the process it changes color from yellow to red. Defuse line is blue.

Examples (outdated, I'll update these at some point):

 - [Bomb goes all the way and explodes](https://youtu.be/AEmutqfrvfQ?t=318)
 - [Terrorists kill the remaining CTs before the bomb explodes](https://youtu.be/AEmutqfrvfQ?t=616)
 - [CTs defuse the bomb](https://www.youtube.com/watch?v=irMnz-U4nCs)

You can choose to keep it red (PGL style) the whole time by changing **colorfade** variable in index.html to 0.

# Instructions

The default settings are made for 1920 width canvas. If you have larger or smaller resolution than Full HD you can switch the width and height in the index.html by modifying **c_bomb.width**, **c_bomb.height**, **c_def.width** and **c_def.width**. If you have the Full HD canvas but want to change the length you can do it by changing **MAX_LENGTH_BOMB** and **MAX_LENGTH_DEF**.

## Nodejs

1. Install [node.js](https://nodejs.org/en/download/)  to Windows
2. Clone/unzip the repository to your computer
3. Go to that folder with your command prompt and enter

    **npm install**

4. After installation is done:

    **node bombtimer.js**

5. Do the OBS stuff

## OBS

Create a new **Browser** Source

Check **Local file**, browser the folder and select **index.html**

Width: **1920**

Height: **1080**

Custom CSS:



    body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }



- **[x]** Shutdown source when not visible 
- **[x]** Refresh browser when scene becomes available 

## CSGO

Copy the gamestate\_integration\_bombtimer.cfg to your cfg folder

    steamapps\common\Counter-Strike Global Offensive\csgo\cfg 

## Testing

You can test this with the following options:

1. Use the dummy page http://127.0.0.1:3000/dummy
2. Use the dummy data provided by either using curl or POSTMAN or whatever
3. Go to a random server with GOTV and hope that they plant the bomb.
4. Play yourself against bots or players and keep in mind that if you are **playing** instead of being a spectator, **the game will send the bomb plant message with a random delay**.

If you want to test this with a real browser instead of Browser source of OBS, use URL http://127.0.0.1:3000/test in your browser.

## Problems?

Ask me if you have any. My DM is open on Twitter and Reddit.
