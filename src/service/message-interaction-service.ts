import { MessageComponentInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { MockMessageInteraction } from './command/mock-message-interaction';

@injectable()
export class MessageInteractionService {
	mockMessageInteraction: MockMessageInteraction;

	constructor(
		@inject(SYMBOLS.MockMessageInteraction) mockMessageInteraction: MockMessageInteraction,
	) {
		this.mockMessageInteraction = mockMessageInteraction;
	}

	public handleMessage(messageInteraction: MessageComponentInteraction) {
		switch(messageInteraction.customId) {
			case "Mock":
				messageInteraction.channel.send(this.mockMessageInteraction.mock(messageInteraction.message.content));
				break;
		}
	}
}