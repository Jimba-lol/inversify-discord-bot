import { CommandInteraction, Interaction, ContextMenuInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';
import { CommandService } from './command-service';
import { ContextMenuService } from './context-menu-service';

@injectable()
export class InteractionService {
  commandService: CommandService;
  contextMenuService: ContextMenuService;

  constructor(
    @inject(SYMBOLS.ContextMenuService) contextMenuService: ContextMenuService,
    @inject(SYMBOLS.CommandService) commandService: CommandService
  ) {
    this.contextMenuService = contextMenuService;
    this.commandService = commandService;
  }

  public handleInteraction(interaction: Interaction) {
    if (interaction.isCommand()) {
      this.commandService.handleCommand(interaction as CommandInteraction);
    } else if (interaction.isContextMenu()) {
      this.contextMenuService.handleInteraction(interaction as ContextMenuInteraction);
    }
  }
}