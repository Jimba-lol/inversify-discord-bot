import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../../symbols';
import { VoiceService } from '../voice-service';
import { ChatCommand } from './_chat-command';

@injectable()
export class ShowQueueCommand implements ChatCommand {
  private voiceService: VoiceService;
  constructor(
    @inject(SYMBOLS.VoiceService) voiceService: VoiceService
  ) {
    this.voiceService = voiceService;
  }

  data = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('OfficerBeepsky will print out the queue for you.');

  execute = async (interaction: CommandInteraction) => {
    this.voiceService.showQueue(interaction);
  }
};
