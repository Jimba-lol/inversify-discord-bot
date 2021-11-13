import { Client, Message } from 'discord.js';
import { CommandService } from './service/command-service';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from './symbols';
// import { MessageResponder } from './service/message-responder';

@injectable()
export class Bot {
	private client: Client;
	private readonly token: string;

	constructor(
		@inject(SYMBOLS.Client) client: Client,
		@inject(SYMBOLS.Token) token: string,
		@inject(SYMBOLS.CommandService) commandService: CommandService
	) {
		this.client = client;
		this.token = token;
	}

	public listen(): Promise<string> {
		this.client.on('messageCreate', (message: Message) => {
			if (message.author.bot)
				return;
			console.log("message received, contents: " + message.content);
		});

		return this.client.login(this.token);
	}
}