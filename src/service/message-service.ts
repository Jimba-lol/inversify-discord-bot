import { SYMBOLS } from '../symbols';
import { inject, injectable } from 'inversify';

import { Message } from 'discord.js';
import * as path from 'path';

@injectable()
export class MessageService {
	resourcePath: string = path.join(__dirname, '../resource');
	constructor() {}

	public handleMessage(message: Message) {
		// pfft, I'm not reading *that*
		if (message.content.length >= 800) {
			message.channel.send({ files: [path.join(this.resourcePath, 'duke.mp4')]});
			return;
		}
	}
}