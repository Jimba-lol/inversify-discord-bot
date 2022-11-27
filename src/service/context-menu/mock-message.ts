import { injectable } from 'inversify';
import { ContextInteraction } from './_context-interaction';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { ContextMenuInteraction, Interaction } from 'discord.js';
import { ContextMenuCommandBuilder } from '@discordjs/builders';

@injectable()
export class MockMessage implements ContextInteraction {
  data = new ContextMenuCommandBuilder()
    .setName('Mock')
    .setType(ApplicationCommandType.Message)
  
  execute = async (interaction: ContextMenuInteraction) => {
    interaction.channel!.messages.fetch(interaction.targetId).then((res) => {
      var result: string = '<:mock:510964804014571530> ';
      [...res.content].forEach((e, i) => {
        result += this.toRandomCase(e);
      });
      interaction.reply(result);
    });
  };

  private toRandomCase(letter: string): string {
    if (letter !== ' ') {
      if (Math.round(Math.random()) == 1) {
        letter = letter.toUpperCase();
      } else {
        letter = letter.toLowerCase();
      }
    }
    return letter;
  }
}
