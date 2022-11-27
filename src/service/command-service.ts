import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction, GuildMember } from 'discord.js';

import { VoiceService } from './voice/voice-service';
import { JoinCommand } from './command/join-command';
import { Command } from './command/command';
import { LeaveCommand } from './command/leave-command';

@injectable()
export class CommandService {
	private commandList: Array<Command> = [];

	private voiceService: VoiceService;
	constructor(
		@inject(SYMBOLS.VoiceService) voiceService: VoiceService,
		@inject(SYMBOLS.JoinCommand) joinCommand: JoinCommand,
		@inject(SYMBOLS.LeaveCommand) leaveCommand: LeaveCommand
	) {
		this.voiceService = voiceService;
		this.commandList.push(joinCommand);
		this.commandList.push(leaveCommand);
	}

	/**
	 * Handles slash commands.
	 * @param interaction The slash command we're handling.
	 */
	public async handleCommand(interaction: CommandInteraction) {
		const command = this.commandList.find(command => interaction.commandName === command.data.name);
		if (command) { command.execute(interaction); }
	}
}
