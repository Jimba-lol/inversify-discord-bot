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
	public async handleCommand(interaction: CommandInteraction) {
		switch (interaction.commandName) {
			case 'join':
				interaction.reply({ content: "Attempting to join your channel...", ephemeral: true });
				this.voiceService.joinVoice(interaction)
				.then(() => interaction.followUp("<:hell:490044821843738624>"))
				.catch((error) => interaction.followUp({ content: error, ephemeral: true }));
				break;
			case 'leave':
				this.voiceService.leaveVoice(interaction);
				break;
			case 'queue':
				this.voiceService.youtubeQueue(interaction);
				break;
			case 'play':
				this.voiceService.playYoutube(interaction);
				break;
			case 'pause':
				this.voiceService.pauseYoutube(interaction);
				break;
			case 'resume':
				this.voiceService.resumeYoutube(interaction);
				break;
			case 'skip':
				this.voiceService.skipYoutube(interaction);
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
