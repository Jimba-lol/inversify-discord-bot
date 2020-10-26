import 'reflect-metadata';
import { Container } from 'inversify';
import { SYMBOLS } from './const/symbols';
import { Bot } from './bot/bot';
import { Client } from 'discord.js';
import { MessageResponder } from './bot/services/message-responder-service';

let container = new Container();

container.bind<Bot>(SYMBOLS.Bot).to(Bot).inSingletonScope();
container.bind<Client>(SYMBOLS.Client).toConstantValue(new Client());
container.bind<string>(SYMBOLS.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(SYMBOLS.MessageResponder).to(MessageResponder).inSingletonScope();

export default container;