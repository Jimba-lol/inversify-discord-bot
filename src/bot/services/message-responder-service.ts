import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../../const/symbols';

@injectable()
export class MessageResponder {

    constructor(
    ) {
    }

    handle(message: Message): Promise<Message | Message[]> {
        return message.reply("Temporary response to being mentioned.");
    }
}