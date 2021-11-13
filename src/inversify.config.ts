import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './symbols';

import { Client, ClientOptions, Intents } from 'discord.js';

import { Bot } from './bot';
import { MessageService } from './service/message-service';
import { InteractionService } from './service/interaction-service';
import { MessageInteractionService } from './service/message-interaction-service';
import { CommandInteractionService } from './service/command-interaction-service';
import { MockMessageInteraction } from './service/command/mock-message-interaction';

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
container.bind<MessageInteractionService>(SYMBOLS.MessageInteractionService).to(MessageInteractionService).inSingletonScope();
container.bind<CommandInteractionService>(SYMBOLS.CommandInteractionService).to(CommandInteractionService).inSingletonScope();
container.bind<MockMessageInteraction>(SYMBOLS.MockMessageInteraction).to(MockMessageInteraction).inSingletonScope();

export default container;