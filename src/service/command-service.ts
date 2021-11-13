import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { Interaction } from 'discord.js';

@injectable()
export class CommandService {
	constructor() {}

	/**
	 * Handles slash commands.
	 * @param interaction The slash command we're handling.
	 */
	public handleCommand(interaction: Interaction) {
		switch (interaction.commandName) {
			case 'mock':
				//something
				break;
		}
	}
}
