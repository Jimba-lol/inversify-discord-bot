import { inject, injectable } from 'inversify';
import { ContextInteraction } from './_context-interaction';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { ContextMenuCommandInteraction, Message, Embed, TextBasedChannel } from 'discord.js';
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

  execute = async (interaction: ContextMenuCommandInteraction) => {
    // FIXME: Need to implement a DB and save GuildID -> highlightChannelId associations instead of hard-coding.
    const highlightChannelId = this.highlightChannelId;
    const highlightChannel: TextBasedChannel = interaction.guild!.channels.cache
      .find(channel => channel.id === highlightChannelId && channel.isTextBased()) as TextBasedChannel;

    if (highlightChannel) {
      interaction.channel!.messages.fetch(interaction.targetId).then((targetMessage) => {
        const isAlreadyHighlighted: boolean = targetMessage.reactions.cache.some((react) => {
          return react.users.cache.size < react.count;
        });
        if (!isAlreadyHighlighted) {
          highlightChannel.send(
            { embeds: [this.embedBuilder(targetMessage).toJSON()] }
          ).catch((e) => console.log(e));;
          targetMessage.react('🌟').catch((e) => console.log(e));
          interaction.reply({
            content: `[Message](${targetMessage.url}) from **${targetMessage.author.username}** highlighted!`,
            ephemeral: false
          }).catch((e) => console.log(e));
        } else {
          interaction.reply({
            content: `[Message](${targetMessage.url}) from **${targetMessage.author.username}** has already been highlighted!`,
            ephemeral: true
          }).catch((e) => console.log(e));
        }
      }).catch((e) => {
        console.log(e);
      });
    } else {
      interaction.reply({ content: 'No highlight channel has been set up.', ephemeral: true });
    }
  };

  private embedBuilder(message: Message): EmbedBuilder {
    const result = new EmbedBuilder()
      .setColor(0xd9a509)
      .setFooter({ text: message.id })
      .setTimestamp();

    let description: string = `[Original Message](${message.url})`;
    if (message.content && message.content.length > 0) {
      description += `\n${message.content}`;
    }

    if (message.author.avatarURL()) {
      result.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL()! });
    } else {
      result.setAuthor({ name: message.author.username });
    }

    message.embeds.forEach((embed: Embed, _index: number) => {
      if (!result.data.image /*&& embed.type === 'image'*/) { result.setImage(embed.url); }
    });

    message.attachments.forEach((attachment) => {
      if (!result.data.image && attachment.contentType?.startsWith('image')) {
        result.setImage(attachment.url);
      } else if (attachment.url && attachment.url.length > 0) {
        description += `\n${attachment.url}`;
      } else if (attachment.proxyURL && attachment.proxyURL.length > 0) {
        description += `\n${attachment.proxyURL}`;
      }
    });

    if (description) { result.setDescription(description); }
    return result;
  }
}
