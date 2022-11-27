require('dotenv').config();
import container from './inversify.config';
import { SYMBOLS } from './symbols';
import { Bot } from './bot';

let bot = container.get<Bot>(SYMBOLS.Bot);
console.log('Starting up...');
bot.listen().then((res) => {
	console.log('Logged in');
}).catch((error) => {
	console.log("Error during login: ", error);
});