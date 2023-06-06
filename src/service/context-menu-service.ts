import { ContextInteraction } from './context-menu/_context-interaction';
import { ContextMenuCommandInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { MockMessage } from './context-menu/mock-message';
import { HighlightMessage } from './context-menu/highlight-message';

@injectable()
export class ContextMenuService {
  contextInteractions: Array<ContextInteraction> = [];

  constructor(
    @inject(SYMBOLS.MockMessage) mockMessage: MockMessage,
    @inject(SYMBOLS.HighlightMessage) highlightMessage: HighlightMessage
  ) {
    this.contextInteractions.push(mockMessage);
    this.contextInteractions.push(highlightMessage);
  }

  public async handleInteraction(interaction: ContextMenuCommandInteraction) {
    const contextInteraction = this.contextInteractions.find((ci) => ci.data.name === interaction.commandName);
    if (contextInteraction) { contextInteraction.execute(interaction).catch((e) => console.log(e)) };
  }

  public getContextInteractions(): Array<ContextInteraction> {
    return this.contextInteractions;
  }
}
