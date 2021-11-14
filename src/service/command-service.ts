import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction } from 'discord.js';

@injectable()
export class CommandService {
	constructor() {}

	/**
	 * Handles slash commands.
	 * @param interaction The slash command we're handling.
	 */
	public handleCommand(interaction: CommandInteraction) {
		switch (interaction.commandName) {
			case 'ping':
				interaction.reply("pong :{D");
				break;
			case 'join':
				// join voice
				break;
			case 'leave':
				// leave voice
				break;
			case 'youtube':
				// play youtube audio
				break;
			case 'sound':
				// play sound
				break;
		}
	}
}
