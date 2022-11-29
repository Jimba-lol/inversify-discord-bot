import { AudioResource, createAudioResource, demuxProbe } from '@discordjs/voice';
import { exec as ytdl } from 'youtube-dl-exec';
import { YoutubeTrackData } from './youtube-track-data';
import { getInfo } from 'ytdl-core';

/**
 * Taken from discordjs/voice/examples/music-bot/src/music/track.ts
 * Written by Amish Shah, Antonio Roman, and Noel (AKA 'iCrawl')
 */
export class YoutubeTrack implements YoutubeTrackData {
  public readonly url: string;
  public readonly title: string;
  public readonly onStart: () => void;
  public readonly onFinish: () => void;
  public readonly onError: (error: Error) => void;

  constructor({ url, title, onStart, onFinish, onError} : YoutubeTrackData) {
    this.url = url;
    this.title = title;
    this.onStart = onStart;
    this.onFinish = onFinish;
    this.onError = onError;
  }

  public createAudioResource(): Promise<AudioResource<YoutubeTrack>> {
    return new Promise((resolve, reject) => {
      const process = ytdl(
        this.url,
        {
          output: "-",
          quiet: true,
          // format: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
          // limitRate: '100K'
        },
        { stdio: ['ignore', 'pipe', 'ignore']}
      );
      if (!process.stdout) {
        reject(new Error('No stdout'));
        return;
      }
      const stream = process.stdout;
      const onError = (error: Error) => {
        if (!process.killed) 
          process.kill();
        stream.resume();
        reject(error);
      };
      process
        .once('spawn', () => {
          demuxProbe(stream)
          .then((probe: { stream: any; type: any; }) => {
            resolve(createAudioResource(probe.stream, { metadata: this, inputType: probe.type}))
          }).catch(onError);
        })
        .catch(onError);
    });
  }

  /**
   * Creates a Track from a video URL and lifecycle callback methods.
   *
   * @param url The URL of the video
   * @param methods Lifecycle callbacks
   *
   * @returns The created Track
   */
  public static async from(url: string, methods: Pick<YoutubeTrack, 'onStart' | 'onFinish' | 'onError'>): Promise<YoutubeTrack> {
    const info = await getInfo(url);

    // The methods are wrapped so that we can ensure that they are only called once.
    const wrappedMethods = {
      onStart() {
        wrappedMethods.onStart = () => {};
        methods.onStart();
      },
      onFinish() {
        wrappedMethods.onFinish = () => {};
        methods.onFinish();
      },
      onError(error: Error) {
        wrappedMethods.onError = () => {};
        methods.onError(error);
      },
    };

    return new YoutubeTrack({
      title: info.videoDetails.title,
      url,
      ...wrappedMethods,
    });
  }
}