import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './symbols';
import { Bot } from './bot';
import { Client, ClientOptions, Intents } from 'discord.js';

let container = new Container();
let clientOptions: ClientOptions = {
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	]
};

container.bind<Bot>(SYMBOLS.Bot).to(Bot).inSingletonScope();
container.bind<Client>(SYMBOLS.Client).toConstantValue(new Client(clientOptions));
container.bind<string>(SYMBOLS.Token).toConstantValue(process.env.TOKEN);

export default container;