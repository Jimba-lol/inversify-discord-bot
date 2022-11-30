import { inject, injectable } from 'inversify';
import { ContextInteraction } from './_context-interaction';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { ContextMenuInteraction, Message, MessageEmbed, TextBasedChannel } from 'discord.js';
import { ContextMenuCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { SYMBOLS } from '../../symbols';

@injectable()
export class HighlightMessage implements ContextInteraction {
  private highlightChannelId: string;
  constructor(
    @inject(SYMBOLS.HighlightChannelId) highlightChannelId: string,
  ) {
    this.highlightChannelId = highlightChannelId;
  }

  data = new ContextMenuCommandBuilder()
    .setName('Highlight')
    .setType(ApplicationCommandType.Message);
  
  execute = async (interaction: ContextMenuInteraction) => {
    // FIXME: Need to implement a DB and save GuildID -> highlightChannelId associations instead of hard-coding.
    const highlightChannelId = this.highlightChannelId;
    const highlightChannel: TextBasedChannel = interaction.guild!.channels.cache
      .find(channel => channel.id === highlightChannelId && channel.isText()) as TextBasedChannel;

    if (highlightChannel) {
      interaction.channel!.messages.fetch(interaction.targetId).then((targetMessage) => {
        highlightChannel.send({ embeds: [this.embedBuilder(targetMessage).toJSON()] });
        interaction.reply({
          content: `[Message](${targetMessage.url}) from **${targetMessage.author.username}** highlighted!`,
          ephemeral: false
        });
      });
    }
  };

  private embedBuilder(message: Message): EmbedBuilder {
    const result = new EmbedBuilder()
      .setColor(0xd9a509)
      .setFooter({ text: message.id })
      .setTimestamp();

    let description = message.content;

    if (message.author.avatarURL()) {
      result.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL()! });
    } else {
      result.setAuthor({ name: message.author.username });
    }

    message.embeds.forEach((embed: MessageEmbed, index: number) => {
      // TODO: embed.type is deprecated. This works for now.
      if (!result.data.image && embed.type === 'image') { result.setImage(embed.url); }
    });

    message.attachments.forEach((attachment) => {
      if (!result.data.image && attachment.contentType?.startsWith('image')) { 
        result.setImage(attachment.url);
      } else {
        description += `\n${attachment.url}`;
      }
    });

    result.setDescription(description);
    return result;
  }
}
