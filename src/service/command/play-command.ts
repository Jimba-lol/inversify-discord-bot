import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice-service';
import { Command } from './_command';

@injectable()
export class PlayCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('OfficerBeepsky will play a fun sound for you')
    .addStringOption((option) => 
      option
        .setName('url')
        .setDescription('Either a YouTube URL or the name of the audio file you want to play')
        .setRequired(true)
      );

  execute = async (interaction: CommandInteraction) => {
    try {
      interaction.deferReply().then(() => {
        this.voiceService.playTrack(interaction);
      });
    } catch(e) {
      if (typeof e === 'string') {
        interaction.reply(e);
      } else if (e instanceof Error) {
        interaction.reply(e.message);
      } else {
        interaction.reply('Something went wrong. Ensure that your URL is valid.');
      }
    }
  }
};