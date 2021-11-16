import { injectable } from 'inversify';
import { VoiceSubscription } from './music/voice-subscription';

import { CommandInteraction, GuildMember, Interaction, Snowflake } from 'discord.js';
import { VoiceConnection, joinVoiceChannel, entersState, VoiceConnectionStatus } from '@discordjs/voice';
import { YoutubeTrack } from './music/youtube-track';

// TODO figure out how to integrate functions like 'skip' and 'pause' into normal audio sounds.
@injectable()
export class VoiceService {
	private voiceSubscriptionArray: Map<Snowflake, VoiceSubscription>;
	constructor() {
		this.voiceSubscriptionArray = new Map<Snowflake, VoiceSubscription>();
	}

	public joinVoice(interaction: CommandInteraction): Promise<VoiceSubscription> {
		return new Promise((resolve, reject) => {
			if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
				try {
					let subscription = new VoiceSubscription(joinVoiceChannel({
						channelId: interaction.member.voice.channel.id,
						guildId: interaction.member.voice.channel.guildId,
						//@ts-ignore
						adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
					}));
					this.voiceSubscriptionArray.set(interaction.guildId, subscription);
					resolve(subscription);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			} else {
				reject("You must be in a voice channel.");
			}
		});
	}

	public leaveVoice(interaction: CommandInteraction) {
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			interaction.reply("<:angryVergil:470440004234117132> I need to be in a voice channel in order to leave one.");
			return;
		}
		subscription.voiceConnection.destroy();
		this.voiceSubscriptionArray.delete(interaction.guildId);
		interaction.reply("<:thomas:464217303211442187> Goobye");
	}

	public youtubeQueue(interaction: CommandInteraction) {
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
			return;
		}
	}

	public pauseYoutube(interaction: CommandInteraction) {
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
			return;
		}
	}

	public resumeYoutube(interaction: CommandInteraction) {
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
			return;
		}
	}

	public skipYoutube(interaction: CommandInteraction) {
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
			return;
		}
	}

	public playYoutube(interaction: CommandInteraction) {
		const url = interaction.options.get('url')!.value! as string;
		let subscription = this.voiceSubscriptionArray.get(interaction.guildId);
		if (!subscription) {
			if (interaction.member instanceof GuildMember && interaction.member.voice.channel)
				this.joinVoice(interaction)
				.then((res) => interaction.reply(this.playYoutubeHelper(interaction, res, url)))
				.catch((error) => interaction.reply(error));
		} else {
			interaction.reply(this.playYoutubeHelper(interaction, subscription, url));
		}
	}

	private async playYoutubeHelper(interaction: CommandInteraction, subscription: VoiceSubscription, url: string): string {
		await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3)
		.catch((err) => {
			console.warn(err);
			return "Something went wrong while joining your channel.";
		});
		const track = await YoutubeTrack.from(url, {
			onStart() {
				interaction.followUp({ content: "Now Playing "}) // TODO
			}
		})

	}

	public playSound() { // need to be careful with this. don't allow ../

	public spamVoice() {

	}
}