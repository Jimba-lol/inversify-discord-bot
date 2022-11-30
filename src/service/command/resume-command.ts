import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice-service';
import { Command } from './_command';

@injectable()
export class ResumeCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('OfficerBeepsky will resume the paused track for you.');

  execute = async (interaction: CommandInteraction) => {
    this.voiceService.resumeTrack(interaction);
  }
};