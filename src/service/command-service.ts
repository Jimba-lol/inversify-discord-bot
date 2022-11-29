import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction } from 'discord.js';

import { JoinCommand } from './command/join-command';
import { Command } from './command/_command';
import { LeaveCommand } from './command/leave-command';
import { PlayCommand } from './command/play-command';
import { PauseCommand } from './command/pause-command';
import { ResumeCommand } from './command/resume-command';
import { ShowQueueCommand } from './command/show-queue-command';
import { SkipCommand } from './command/skip-command';

@injectable()
export class CommandService {
  commands: Array<Command> = [];

  constructor(
    @inject(SYMBOLS.JoinCommand) joinCommand: JoinCommand,
    @inject(SYMBOLS.LeaveCommand) leaveCommand: LeaveCommand,
    @inject(SYMBOLS.PlayCommand) playCommand: PlayCommand,
    @inject(SYMBOLS.PauseCommand) pauseCommand: PauseCommand,
    @inject(SYMBOLS.ResumeCommand)resumeCommand: ResumeCommand,
    @inject(SYMBOLS.ShowQueueCommand)showQueueCommand: ShowQueueCommand,
    @inject(SYMBOLS.SkipCommand)skipCommand: SkipCommand
  ) {
    this.commands.push(joinCommand);
    this.commands.push(leaveCommand);
    this.commands.push(playCommand);
    this.commands.push(pauseCommand);
    this.commands.push(resumeCommand);
    this.commands.push(showQueueCommand);
    this.commands.push(skipCommand);
  }

  /**
   * Handles slash commands.
   * @param interaction The slash command we're handling.
   */
  public async handleCommand(interaction: CommandInteraction) {
    const command = this.commands.find(command => interaction.commandName === command.data.name);
    if (command) { command.execute(interaction); }
  }

  public getCommands(): Array<Command> {
    return this.commands;
  }
}
