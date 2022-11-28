import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction } from 'discord.js';

import { JoinCommand } from './command/join-command';
import { Command } from './command/_command';
import { LeaveCommand } from './command/leave-command';

@injectable()
export class CommandService {
  commands: Array<Command> = [];

  constructor(
    @inject(SYMBOLS.JoinCommand) joinCommand: JoinCommand,
    @inject(SYMBOLS.LeaveCommand) leaveCommand: LeaveCommand
  ) {
    this.commands.push(joinCommand);
    this.commands.push(leaveCommand);
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
