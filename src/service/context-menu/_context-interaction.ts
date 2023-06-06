import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ContextMenuCommandInteraction } from "discord.js";

export interface ContextInteraction {
  data: Omit<ContextMenuCommandBuilder, '' | ''>;
  execute: (interaction: ContextMenuCommandInteraction) => Promise<void>;
}
