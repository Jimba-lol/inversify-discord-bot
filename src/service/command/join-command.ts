import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice-service';
import { Command } from './_command';

@injectable()
export class JoinCommand implements Command {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('join')
    .setDescription('OfficerBeepsky will join your voice channel');

  execute = async (interaction: CommandInteraction) => {
    this.voiceService.joinVoice(interaction)
      .then(() => interaction.reply(":fire:<:hell:490044821843738624>:fire:"))
      .catch((rejection: string) => interaction.reply(rejection));
  }
};