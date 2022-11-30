import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ContextMenuInteraction } from "discord.js";

export interface ContextInteraction {
  data: Omit<ContextMenuCommandBuilder, '' | ''>;
  execute: (interaction: ContextMenuInteraction) => Promise<void>;
}
