import { ContextInteraction } from './context-menu/_context-interaction';
import { ContextMenuInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { MockMessage } from './context-menu/mock-message';

@injectable()
export class ContextMenuService {
  contextInteractions: Array<ContextInteraction> = [];

  constructor(
    @inject(SYMBOLS.MockMessage) mockMessage: MockMessage,
    // @inject(SYMBOLS.HighlightMessage) highlightMessage: HighlightMessage,
  ) {
    this.contextInteractions.push(mockMessage);
  }

  public handleInteraction(interaction: ContextMenuInteraction) {
    const contextInteraction = this.contextInteractions.find((ci) => ci.data.name === interaction.commandName);
    if (contextInteraction) { contextInteraction.execute(interaction) };
  }
}
