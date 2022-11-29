import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceSubscription } from '../voice/model/voice-subscription';
import { VoiceService } from '../voice/voice-service';
import { Command } from './_command';
import { joinVoiceChannel } from '@discordjs/voice';

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
    this.voiceService.playTrack(interaction);
  }
};