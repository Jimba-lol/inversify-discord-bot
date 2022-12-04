import { VolumeCommand } from "./service/command/volume-command";

export const SYMBOLS = {
  Bot: Symbol('Bot'),
  Client: Symbol('Client'),
  Token: Symbol('Token'),
  HighlightChannelId: Symbol('HighlightChannelId'),

  CommandService: Symbol('CommandService'),
  ContextMenuService: Symbol('ContextMenuService'),
  InteractionService: Symbol('InteractionService'),
  MessageService: Symbol('MessageService'),
  VoiceService: Symbol('VoiceService'),

  MockMessage: Symbol('MockMessage'),
  HighlightMessage: Symbol('HighlightMessage'),

  JoinCommand: Symbol('JoinCommand'),
  LeaveCommand: Symbol('LeaveCommand'),
  PlayCommand: Symbol('PlayCommand'),
  PauseCommand: Symbol('PauseCommand'),
  ResumeCommand: Symbol('ResumeCommand'),
  ShowQueueCommand: Symbol('ShowQueueCommand'),
  SkipCommand: Symbol('SkipCommand'),
  VolumeCommand: Symbol('VolumeCommand')
}
