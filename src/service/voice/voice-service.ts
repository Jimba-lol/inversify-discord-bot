import { injectable } from 'inversify';
import { VoiceSubscription } from './model/voice-subscription';

import { CommandInteraction, GuildMember, Interaction, Snowflake } from 'discord.js';
import { VoiceConnection, joinVoiceChannel, entersState, VoiceConnectionStatus } from '@discordjs/voice';
import { YoutubeTrack } from './model/youtube-track';

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
        reject("You must be in a voice channel.");
      }
    });
  }

  public leaveVoice(interaction: CommandInteraction): Promise<string> {
    return new Promise((resolve, reject) => {
      const subscription = this.subscriptions.get(interaction.guildId!);
      if (!subscription) {
        reject("<:angryVergil:470440004234117132> I need to be in a voice channel in order to leave one.");
        return;
      } else {
        subscription.voiceConnection.destroy();
        resolve(":wave:<:thomas:464217303211442187>");
      }
    });
  }

  public queueTrack(interaction: CommandInteraction) {
    let subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
      return;
    }
  }

  public pauseTrack(interaction: CommandInteraction) {
    let subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
      return;
    }
  }

  public resumeTrack(interaction: CommandInteraction) {
    let subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
      return;
    }
  }

  public skipTrack(interaction: CommandInteraction) {
    let subscription = this.subscriptions.get(interaction.guildId!);
    if (!subscription) {
      interaction.reply("<:angryVergil:470440004234117132> I'm not even in voice.");
      return;
    }
  }

  // Will most likely want to rehaul this and the helper method.
  // Will want to create new type 'FileTrack' which can 
  public playTrack(interaction: CommandInteraction): void {
    const url = interaction.options.get('url')!.value! as string;
    let subscription = this.subscriptions.get(interaction.guildId!);
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
      return "Something went wrong while joining your channel.";
    });
    try {
      const track = await YoutubeTrack.from(url, {
        onStart() {
          interaction.followUp({ content: `Now Playing **${track.title}** - ${track.url}`, ephemeral: false }).catch(console.warn);
        },
        onFinish() {
          interaction.followUp({ content: "Now Finished", ephemeral: true }).catch(console.warn);
        },
        onError(err) {
          console.warn(err);
          interaction.followUp({ content: `Error: ${err.message}`, ephemeral: true }).catch(console.warn);
        }
      });
      subscription.enqueue(track);
      await interaction.reply(`Enqueued **${track.title}**`);
    } catch (err) {
      console.warn(err);
      interaction.followUp('An error has occurred while trying to play the track.');
    }
  }

  public spamVoice() {
    // Detect when someone is speaking, and while they are, play a loud sound
  }
}