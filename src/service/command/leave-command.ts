import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice/voice-service';
import { Command } from './command';

@injectable()
export class LeaveCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('OfficerBeepsky will leave voice');
  execute = async (interaction: CommandInteraction) => {
    this.voiceService.leaveVoice(interaction)
      .then((message: string) => interaction.reply(message))
      .catch((rejection: string) => interaction.reply(rejection));
  }
};