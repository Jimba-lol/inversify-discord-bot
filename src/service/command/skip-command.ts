import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice/voice-service';
import { Command } from './_command';

@injectable()
export class SkipCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('OfficerBeepsky will skip the current track for you.');

  execute = async (interaction: CommandInteraction) => {
    this.voiceService.skipTrack(interaction);
  }
};