import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../../symbols';

import { Client, StageChannel, VoiceChannel, VoiceState } from 'discord.js';
import { VoiceConnection, joinVoiceChannel } from '@discordjs/voice';


@injectable()
export class VoiceService {
	private client: Client;
	private voiceConnection: VoiceConnection;
	constructor(
		@inject(SYMBOLS.Client) client: Client,
	) {
		this.client = client;
	}

	public joinVoice(voiceChannel: VoiceChannel | StageChannel): Promise<VoiceConnection> {
		return new Promise((resolve, reject) => {
			if (!voiceChannel)
				reject("You must be in a voice channel.");
			try {
				this.voiceConnection = joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: voiceChannel.guildId,
					//@ts-ignore
					adapterCreator: voiceChannel.guild.voiceAdapterCreator
				});
				resolve(this.voiceConnection);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	public leaveVoice(): boolean {
		
		if (!this.voiceConnection)
			return false;
		this.voiceConnection.destroy();
		this.voiceConnection = null;
		return true;
	}

	public playYoutube() {
		// TODO WIP
	}

	public playSound() { // need to be careful with this. don't allow ../

	}

	public spamVoice() {

	}
}