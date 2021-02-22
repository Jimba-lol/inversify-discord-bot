// Framework Imports
import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './const/symbols';

// Bot Imports
import { Bot } from './bot/bot';
import { Client } from 'discord.js';
import { MessageResponder } from './bot/services/message-responder-service';
import { RobloxQueueService } from './bot/services/roblox-queue-service';

// Express Imports
import { ExpressServer } from './express/express-server';
import { RobloxGameService } from './express/services/roblox.service';
import { RobloxGameBuilderService } from './bot/services/roblox-game-builder-service';

let container = new Container();

// Bot bindings
container.bind<Bot>(SYMBOLS.Bot).to(Bot).inSingletonScope();
container.bind<Client>(SYMBOLS.Client).toConstantValue(new Client());
container.bind<string>(SYMBOLS.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(SYMBOLS.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<RobloxQueueService>(SYMBOLS.RobloxQueueService).to(RobloxQueueService).inSingletonScope();
container.bind<RobloxGameBuilderService>(SYMBOLS.RobloxGameBuilderService).to(RobloxGameBuilderService).inSingletonScope();

// Express bindings
container.bind<ExpressServer>(SYMBOLS.ExpressServer).to(ExpressServer).inSingletonScope();
container.bind<RobloxGameService>(SYMBOLS.RobloxGameService).to(RobloxGameService).inSingletonScope();

export default container;