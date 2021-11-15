import { ContextMenuInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { MockMessage } from './context-menu/mock-message';

@injectable()
export class ContextMenuService {
	mockMessage: MockMessage;

	constructor(
		@inject(SYMBOLS.MockMessage) mockMessage: MockMessage,
	) {
		this.mockMessage = mockMessage;
	}

	public handleInteraction(interaction: ContextMenuInteraction) {
		switch (interaction.commandName) {
			case "Mock":
				interaction.channel.messages.fetch(interaction.targetId).then((res) => {
					interaction.reply(this.mockMessage.mock(res.content));
				});
				break;
			case "Highlight":
				// copy message to the highlights channel
		}
	}
}