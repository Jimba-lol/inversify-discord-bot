import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import * as REST from '@discordjs/rest';
import * as Routes from 'discord-api-types/v9';

import * as fs from 'fs';

@injectable()
export class CommandService {
	private readonly token: string;
	guildId = '42690166732525568';
	commands = [];
	commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));

	constructor(
		@inject(SYMBOLS.Token) token: string,
	) {
		this.token = token;
	}

	// This isn't operating in a typescript way. need to change.
	public registerCommands() {
		for (const file of this.commandFiles) {
			const command = require(`./commands/${file}`);
			this.commands.push(command.data.toJSON());
		}
		// WIP
	}
}