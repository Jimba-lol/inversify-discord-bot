import { injectable } from 'inversify';
import { VoiceSubscription } from '../model/voice-subscription';

import { CommandInteraction, GuildMember, Snowflake } from 'discord.js';
import { joinVoiceChannel, entersState, VoiceConnectionStatus, AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { YoutubeTrack } from '../model/youtube-track';

// TODO figure out how to integrate functions like 'skip' and 'pause' into normal audio sounds.
@injectable()
export class VoiceService {
  subscriptions: Map<Snowflake, VoiceSubscription>;
  constructor() {
    this.subscriptions = new Map<Snowflake, VoiceSubscription>();
  }

  public joinVoice(interaction: CommandInteraction): Promise<VoiceSubscription> {
    return new Promise((resolve, reject) => {
      if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
        try {
          const subscription = new VoiceSubscription(joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guildId,
            //@ts-ignore
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
          }));
          this.subscriptions.set(interaction.guildId!, subscription);
          resolve(subscription);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      } else {
        reject('You must be in a voice channel.');
      }
    });
  }

  public leaveVoice(interaction: CommandInteraction): Promise<string> {
    return new Promise((resolve, reject) => {
      const subscription = this.subscriptions.get(interaction.guildId!);
      if (!subscription) {
        reject('<:angryVergil:470440004234117132> I need to be in a voice channel in order to leave one.');
        return;
      } else {
        subscription.voiceConnection.destroy();
        this.subscriptions.delete(interaction.guildId!);
        resolve(':wave:<:thomas:464217303211442187>');
      }
    });
  }

  public showQueue(interaction: CommandInteraction): void {
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply('<:angryVergil:470440004234117132> I\'m not even in voice.');
    } else {
      const current =
        (subscription.audioPlayer.state.status === AudioPlayerStatus.Idle)
          ? 'Nothing is currently playing'
          : `Currently playing **${(subscription.audioPlayer.state.resource as AudioResource<YoutubeTrack>).metadata.title}**`;
      const queue = subscription.queue
        .slice(0, 3)
        .map((track, index) => `${index + 1} ${track.title}`)
        .join('\n');
      interaction.reply(`${current}\n\n${queue}`);
    }
  }

  public pauseTrack(interaction: CommandInteraction): void {
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply('<:angryVergil:470440004234117132> I\'m not even in voice.');
    } else {
      subscription.audioPlayer.pause();
      interaction.reply('<:nero:503837001309618177>:pause_button:');
    }
  }

  public resumeTrack(interaction: CommandInteraction): void {
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply('<:angryVergil:470440004234117132> I\'m not even in voice.');
    } else {
      subscription.audioPlayer.unpause();
      interaction.reply('<:tommy:445018418702188554>:arrow_forward:');
    }
  }

  public skipTrack(interaction: CommandInteraction): void {
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply('<:angryVergil:470440004234117132> I\'m not even in voice.');
    } else {
      subscription.audioPlayer.stop();
      interaction.reply('<:ultimate:457761606391300115>:next_track:');
    }
  }

  // Will most likely want to rehaul this and the helper method.
  // Will want to create new type 'FileTrack' which can
  public playTrack(interaction: CommandInteraction): void {
    const url = interaction.options.get('url')!.value! as string;
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      if (interaction.member instanceof GuildMember && interaction.member.voice.channel)
        this.joinVoice(interaction)
        .then((res) => this.playTrackHelper(interaction, res, url))
        .catch((error) => interaction.reply(error));
    } else {
      this.playTrackHelper(interaction, subscription, url);
    }
  }

  // may want to remove awaits. try to approach this in a different way.
  // obv. this will still need to be async, though.
  private async playTrackHelper(
        interaction: CommandInteraction,
        subscription: VoiceSubscription, url: string): Promise<void> {
    await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3)
    .catch((err) => {
      console.warn(err);
      return 'Something went wrong while joining your channel.';
    });
    try {
      const track = await YoutubeTrack.from(url, {
        onStart() {
          interaction.followUp({ content: `Now Playing **${track.title}**`, ephemeral: false }).catch(console.warn);
        },
        onFinish() {
          interaction.followUp({ content: 'Now Finished', ephemeral: true }).catch(console.warn);
        },
        onError(err) {
          console.warn(err);
          interaction.followUp({ content: `Error: ${err.message}`, ephemeral: true }).catch(console.warn);
        }
      });
      subscription.enqueue(track);
      interaction.editReply(`Enqueued **${track.title}\n${track.url}**`);
    } catch (err) {
      console.warn(err);
      interaction.editReply('An error has occurred while trying to play the track.');
    }
  }

  public setSubscriptionVolume(interaction: CommandInteraction) {
    const subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply('<:angryVergil:470440004234117132> I\'m not even in voice.');
    } else {
      const vol = Math.floor(interaction.options.get('level')!.value! as number);
      interaction.reply(`Volume set to ${subscription.setVolume(vol)}`);
    }
  }

  public spamVoice() {
    // Detect when someone is speaking, and while they are, play a loud sound
  }
}
