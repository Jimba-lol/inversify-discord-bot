import { CommandInteraction, Interaction, ContextMenuCommandInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { ChatCommandService } from './chat-command-service';
import { ContextMenuService } from './context-menu-service';

@injectable()
export class InteractionService {
  chatCommandService: ChatCommandService;
  contextMenuService: ContextMenuService;

  constructor(
    @inject(SYMBOLS.ContextMenuService) contextMenuService: ContextMenuService,
    @inject(SYMBOLS.ChatCommandService) commandService: ChatCommandService
  ) {
    this.contextMenuService = contextMenuService;
    this.chatCommandService = commandService;
  }

  public handleInteraction(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      this.chatCommandService.handleChatCommand(interaction as CommandInteraction).catch((e) => console.log(e));
    } else if (interaction.isContextMenuCommand()) {
      this.contextMenuService.handleInteraction(interaction as ContextMenuCommandInteraction).catch((e) => console.log(e));
    }
  }
}
