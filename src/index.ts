require('dotenv').config();
import { default as container } from './inversify.config';
import { SYMBOLS } from './const/symbols';

import { Bot } from './bot/bot';
import { ExpressServer } from './express/express-server';

// Discord Bot
let bot = container.get<Bot>(SYMBOLS.Bot);
bot.logIn().then(() => {
    console.log('Logged in');
    bot.listen();
}).catch((error) => {
    console.log('error logging in: ' + error)
});