import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction } from 'discord.js';
import { MockCommand } from './command/mock-command';

@injectable()
export class CommandService {
	mockCommand: MockCommand;
	constructor(
		@inject(SYMBOLS.MockCommand) mockCommand: MockCommand,
	) {
		this.mockCommand = mockCommand;
	}

	/**
	 * Handles slash commands.
	 * @param interaction The slash command we're handling.
	 */
	public handleCommand(interaction: CommandInteraction) {
		switch (interaction.commandName) {
			case 'mock':
				interaction.reply(this.mockCommand.mock(interaction.options.getString('input')));
				break;
		}
	}
}
