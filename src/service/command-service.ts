import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../symbols';

import { CommandInteraction, GuildMember } from 'discord.js';

import { VoiceService } from './voice/voice-service';

@injectable()
export class CommandService {
	private voiceService: VoiceService;
	constructor(
		@inject(SYMBOLS.VoiceService) voiceService: VoiceService,
	) {
		this.voiceService = voiceService;
	}

	/**
	 * Handles slash commands.
	 * @param interaction The slash command we're handling.
	 */
	public handleCommand(interaction: CommandInteraction) {
		switch (interaction.commandName) {
			case 'join':
				interaction.reply("Attempting to join your channel...");
				this.voiceService.joinVoice((interaction.member as GuildMember).voice.channel)
				.then(() => interaction.followUp("<:hell:490044821843738624>"))
				.catch((error) => interaction.followUp(error));
				break;
			case 'leave':
				if (this.voiceService.leaveVoice()) {
					interaction.reply("<:thomas:464217303211442187> Goobye");
				} else {
					interaction.reply("<:angryVergil:470440004234117132> I need to be in a voice channel in order to leave one.");
				}
				break;
			case 'youtube':
				// play youtube audio
				// TODO WIP
				break;
			case 'sound':
				// play sound
				break;
			case 'spam':
				// spam any time someone speaks
				break;
		}
	}
}
