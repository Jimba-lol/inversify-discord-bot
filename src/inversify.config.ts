import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './symbols';

import { Client, ClientOptions, Intents } from 'discord.js';

import { Bot } from './bot';
import { MessageService } from './service/message-service';
import { InteractionService } from './service/interaction-service';
import { ContextMenuService } from './service/context-menu-service';
import { CommandService } from './service/command-service';
import { MockMessage } from './service/context-menu/mock-message';

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

container.bind<InteractionService>(SYMBOLS.InteractionService).to(InteractionService).inSingletonScope();
container.bind<ContextMenuService>(SYMBOLS.ContextMenuService).to(ContextMenuService).inSingletonScope();
container.bind<CommandService>(SYMBOLS.CommandService).to(CommandService).inSingletonScope();
container.bind<MockMessage>(SYMBOLS.MockMessage).to(MockMessage).inSingletonScope();

export default container;