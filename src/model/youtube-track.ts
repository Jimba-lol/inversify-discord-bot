import { AudioResource, createAudioResource, demuxProbe } from '@discordjs/voice';
import { exec as ytdl } from 'youtube-dl-exec';
import { YoutubeTrackData } from './youtube-track-data';
import { getInfo } from 'ytdl-core';

/**
 * Taken from discordjs/voice/examples/music-bot/src/music/track.ts
 * Written by Amish Shah, Antonio Roman, and Noel (AKA 'iCrawl')
 */
export class YoutubeTrack implements YoutubeTrackData {
  private _url: string;
  private _startSeconds: number;
  private _title: string;
  private _onStart: () => void;
  private _onFinish: () => void;
  private _onError: (error: Error) => void;

  public get url() { return this._url }
  public get startSeconds() { return this._startSeconds }
  public get title() { return this._title }
  public get onStart() { return this._onStart }
  public get onFinish() { return this._onFinish }
  public get onError() { return this._onError }

  constructor({ url, title, onStart, onFinish, onError} : YoutubeTrackData) {
    this._url = url;
    this._startSeconds = 0;
    this.processUrlForTimestamp(url);

    this._title = title;
    this._onStart = onStart;
    this._onFinish = onFinish;
    this._onError = onError;
  }

  private processUrlForTimestamp(url: string): void {
    const urlComponents = url.split('&');
    this._url = urlComponents.shift()!;
    urlComponents.forEach((urlComponent) => {
      if (urlComponent.startsWith('t=')) {
        urlComponent = urlComponent.substring(2); // remove 't='
        this._startSeconds = this.ytTimestampToSeconds(urlComponent);
      }
    });
  }

  /**
   *
   * @param timestamp string of form '1h11m11s' or '11m11s', etc.
   * @returns number of seconds
   */
  private ytTimestampToSeconds(timestamp: string): number {
    let seconds = 0;

    if (timestamp.endsWith('s')) {
      timestamp = timestamp.substring(0, timestamp.length - 1);
    }

    if (timestamp.includes('h')) {
      const split = timestamp.split('h');
      seconds += +split[0] * 3600;
      timestamp = split[1];
    }
    if (timestamp.includes('m')) {
      const split = timestamp.split('m');
      seconds += +split[0] * 60;
      timestamp = split[1];
    }

    seconds += +timestamp;
    return seconds;
  }

  public createAudioResource(): Promise<AudioResource<YoutubeTrack>> {
    let ytFlags: any = { output: '-', quiet: true }
    if (this._startSeconds) {
      ytFlags.downloadSections = `*${this._startSeconds}-inf`;
    }

    let ytOptions: any = { stdio: ['ignore', 'pipe', 'ignore'] };

    return new Promise((resolve, reject) => {
      const process = ytdl(this.url, ytFlags, ytOptions);
      if (!process.stdout) {
        reject(new Error('No stdout'));
        return;
      }
      const stream = process.stdout;
      const onError = (error: Error) => {
        if (!process.killed) { process.kill(); }
        stream.resume();
        reject(error);
      };
      process
        .once('spawn', () => {
          demuxProbe(stream).then((probe: { stream: any; type: any; }) => {
            resolve(createAudioResource(probe.stream, { metadata: this, inputType: probe.type, inlineVolume: true }));
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

    const selfDestructingMethods = {
      onStart() {
        selfDestructingMethods.onStart = () => {};
        methods.onStart();
      },
      onFinish() {
        selfDestructingMethods.onFinish = () => {};
        methods.onFinish();
      },
      onError(error: Error) {
        selfDestructingMethods.onError = () => {};
        methods.onError(error);
      },
    };

    return new YoutubeTrack({
      title: info.videoDetails.title,
      url,
      ...selfDestructingMethods,
    });
  }
}
