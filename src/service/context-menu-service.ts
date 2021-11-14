import { ContextMenuInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { MockMessageInteraction } from './command/mock-message-interaction';

@injectable()
export class ContextMenuService {
	mockMessageInteraction: MockMessageInteraction;

	constructor(
		@inject(SYMBOLS.MockMessageInteraction) mockMessageInteraction: MockMessageInteraction,
	) {
		this.mockMessageInteraction = mockMessageInteraction;
	}

	public handleInteraction(interaction: ContextMenuInteraction) {
		switch (interaction.commandName) {
			case "Mock":
				interaction.channel.messages.fetch(interaction.targetId).then((res) => {
					interaction.reply(this.mockMessageInteraction.mock(res.content));
				});
				break;
			case "Highlight":
				// copy message to the highlights channel
		}
	}
}