import { inject, injectable } from 'inversify';
import { SYMBOLS } from './symbols';

import { Client, Message, Interaction, CommandInteraction } from 'discord.js';

import { CommandService } from './service/command-service';
import { MessageService } from './service/message-service';

@injectable()
export class Bot {
	private client: Client;
	private readonly token: string;
	private commandService: CommandService;
	private messageService: MessageService;

	constructor(
		@inject(SYMBOLS.Client) client: Client,
		@inject(SYMBOLS.Token) token: string,
		@inject(SYMBOLS.CommandService) commandService: CommandService,
		@inject(SYMBOLS.MessageService) messageService: MessageService,
	) {
		this.client = client;
		this.token = token;
	}

	public listen(): Promise<string> {
		this.client.on('messageCreate', (message: Message) => {
			if (message.author.bot)
				return;
			this.messageService.handleMessage(message);
		});
		this.client.on('interaction', (interaction: Interaction) => {
			if (!interaction.isCommand())
				return;
			this.commandService.handleCommand(interaction as CommandInteraction);
		});
		return this.client.login(this.token);
	}
}