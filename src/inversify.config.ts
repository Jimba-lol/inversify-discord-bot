import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './symbols';

import { Client, ClientOptions, Intents } from 'discord.js';

import { Bot } from './bot';
import { MessageService } from './service/message-service';
import { CommandService } from './service/command-service';
import { MockCommand } from './service/command/mock-command';

let container = new Container();
let clientOptions: ClientOptions = {
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	]
};

container.bind<Bot>(SYMBOLS.Bot).to(Bot).inSingletonScope();
container.bind<Client>(SYMBOLS.Client).toConstantValue(new Client(clientOptions));
container.bind<string>(SYMBOLS.Token).toConstantValue(process.env.TOKEN);

container.bind<MessageService>(SYMBOLS.MessageService).to(MessageService).inSingletonScope();

container.bind<CommandService>(SYMBOLS.CommandService).to(CommandService).inSingletonScope();
container.bind<MockCommand>(SYMBOLS.MockCommand).to(MockCommand).inSingletonScope();

export default container;