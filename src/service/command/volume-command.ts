import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice-service';
import { Command } from './_command';

@injectable()
export class VolumeCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('OfficerBeepsky will skip the current track for you.')
    .addNumberOption((option) => 
      option
        .setName('level')
        .setDescription('Number from 0 to 400')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(400)
    );

  execute = async (interaction: CommandInteraction) => {
    this.voiceService.setSubscriptionVolume(interaction);
  }
};