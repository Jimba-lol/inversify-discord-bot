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
import { VoiceService } from './service/voice-service';
import { JoinCommand } from './service/command/join-command';
import { LeaveCommand } from './service/command/leave-command';
import { PlayCommand } from './service/command/play-command';
import { PauseCommand } from './service/command/pause-command';
import { ResumeCommand } from './service/command/resume-command';
import { ShowQueueCommand } from './service/command/show-queue-command';
import { SkipCommand } from './service/command/skip-command';
import { HighlightMessage } from './service/context-menu/highlight-message';
import { VolumeCommand } from './service/command/volume-command';

let container = new Container();
let clientOptions: ClientOptions = {
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
};

container.bind<Bot>(SYMBOLS.Bot).to(Bot).inSingletonScope();
container.bind<Client>(SYMBOLS.Client).toConstantValue(new Client(clientOptions));
container.bind<string>(SYMBOLS.Token).toConstantValue(process.env.TOKEN!);
container.bind<string>(SYMBOLS.HighlightChannelId).toConstantValue(process.env.HIGHLIGHT_CHANNEL_ID!);

container.bind<CommandService>(SYMBOLS.CommandService).to(CommandService).inSingletonScope();
container.bind<ContextMenuService>(SYMBOLS.ContextMenuService).to(ContextMenuService).inSingletonScope();
container.bind<InteractionService>(SYMBOLS.InteractionService).to(InteractionService).inSingletonScope();
container.bind<MessageService>(SYMBOLS.MessageService).to(MessageService).inSingletonScope();
container.bind<VoiceService>(SYMBOLS.VoiceService).to(VoiceService).inSingletonScope();

container.bind<MockMessage>(SYMBOLS.MockMessage).to(MockMessage).inSingletonScope();
container.bind<HighlightMessage>(SYMBOLS.HighlightMessage).to(HighlightMessage).inSingletonScope();

container.bind<JoinCommand>(SYMBOLS.JoinCommand).to(JoinCommand).inSingletonScope();
container.bind<LeaveCommand>(SYMBOLS.LeaveCommand).to(LeaveCommand).inSingletonScope();
container.bind<PlayCommand>(SYMBOLS.PlayCommand).to(PlayCommand).inSingletonScope();
container.bind<PauseCommand>(SYMBOLS.PauseCommand).to(PauseCommand).inSingletonScope();
container.bind<ResumeCommand>(SYMBOLS.ResumeCommand).to(ResumeCommand).inSingletonScope();
container.bind<ShowQueueCommand>(SYMBOLS.ShowQueueCommand).to(ShowQueueCommand).inSingletonScope();
container.bind<SkipCommand>(SYMBOLS.SkipCommand).to(SkipCommand).inSingletonScope();
container.bind<VolumeCommand>(SYMBOLS.VolumeCommand).to(VolumeCommand).inSingletonScope();

export default container;