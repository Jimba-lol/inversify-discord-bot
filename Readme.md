# My Discord Bot

## System Requirements
* C++ compiler such as G++
* Python 3.8 or above
* ffmpeg
* make

## Running the Discord Bot:
to compile in watch mode:\
`npm run watch`

to compile once:\
`npm run build`

to run tests:\
`npm run test`

to run the app:\
`npm run start`

to register commands to your discord server:\
`npm run register-commands`

## Setup
put custom audio files here:\
`src/resource/sound`

## Features
### Context Menu Actions
right click message -> Mock\
Mocks the message

### Slash Commands
Join your voice channel:\
`/join`

Leave voice:\
`/leave`

Play a YouTube video:\
`/play`

Pause the YouTube video:\
`/pause`

Resume playing a paused video:\
`/resume`

Display the current YouTube queue:\
`/queue`

Skip the current YouTube video:\
`/skip`

Change the volume for next video (scale of 0 to 200):\
`/volume`

### Misc. Features
If the bot sees a message whose length is >799, it will comment on this.
