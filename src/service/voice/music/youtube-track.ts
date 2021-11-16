import { AudioResource, createAudioResource, demuxProbe } from '@discordjs/voice';
import { raw as ytdl } from 'youtube-dl-exec';
import { YoutubeTrackData } from './youtube-track-data';

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
					o: "-",
					q: "",
					f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
					r: '100K'
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
				.then((probe: { stream: any; type: any; }) => resolve(createAudioResource(probe.stream, { metadata: this, inputType: probe.type})))
				.catch(onError);
			})
			.catch(onError);
		});
	}
}