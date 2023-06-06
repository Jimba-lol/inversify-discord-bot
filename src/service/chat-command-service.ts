import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction } from 'discord.js';

import { JoinCommand } from './chat-command/join-command';
import { ChatCommand } from './chat-command/_chat-command';
import { LeaveCommand } from './chat-command/leave-command';
import { PlayCommand } from './chat-command/play-command';
import { PauseCommand } from './chat-command/pause-command';
import { ResumeCommand } from './chat-command/resume-command';
import { ShowQueueCommand } from './chat-command/show-queue-command';
import { SkipCommand } from './chat-command/skip-command';
import { VolumeCommand } from './chat-command/volume-command';

@injectable()
export class ChatCommandService {
  commands: Array<ChatCommand> = [];

  constructor(
    @inject(SYMBOLS.JoinCommand) joinCommand: JoinCommand,
    @inject(SYMBOLS.LeaveCommand) leaveCommand: LeaveCommand,
    @inject(SYMBOLS.PlayCommand) playCommand: PlayCommand,
    @inject(SYMBOLS.PauseCommand) pauseCommand: PauseCommand,
    @inject(SYMBOLS.ResumeCommand) resumeCommand: ResumeCommand,
    @inject(SYMBOLS.ShowQueueCommand) showQueueCommand: ShowQueueCommand,
    @inject(SYMBOLS.SkipCommand) skipCommand: SkipCommand,
    @inject(SYMBOLS.VolumeCommand) volumeCommand: VolumeCommand
  ) {
    this.commands.push(joinCommand);
    this.commands.push(leaveCommand);
    this.commands.push(playCommand);
    this.commands.push(pauseCommand);
    this.commands.push(resumeCommand);
    this.commands.push(showQueueCommand);
    this.commands.push(skipCommand);
    this.commands.push(volumeCommand);
  }

  /**
   * Handles slash commands.
   * @param interaction The slash command we're handling.
   */
  public async handleChatCommand(interaction: CommandInteraction) {
    const command = this.commands.find(command => interaction.commandName === command.data.name);
    if (command) { command.execute(interaction).catch((e) => console.log(e)); }
  }

  public getChatCommands(): Array<ChatCommand> {
    return this.commands;
  }
}
