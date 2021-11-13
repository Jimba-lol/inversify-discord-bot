import { CommandInteraction, Interaction, MessageComponentInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { CommandInteractionService } from './command-interaction-service';
import { MessageInteractionService } from './message-interaction-service';

@injectable()
export class InteractionService {
	commandInteractionService: CommandInteractionService;
	messageInteractionService: MessageInteractionService;

	constructor(
		@inject(SYMBOLS.MessageInteractionService) messageInteractionService: MessageInteractionService,
		@inject(SYMBOLS.CommandInteractionService) commandInteractionService: CommandInteractionService
	) {
		this.messageInteractionService = messageInteractionService;
		this.commandInteractionService = commandInteractionService;
	}

	public handleInteraction(interaction: Interaction) {
		switch(interaction.type) {
			case "APPLICATION_COMMAND":
				this.commandInteractionService.handleCommand(interaction as CommandInteraction);
				break;
			case "MESSAGE_COMPONENT":
				this.messageInteractionService.handleMessage(interaction as MessageComponentInteraction);
				break;
		}
	}
}