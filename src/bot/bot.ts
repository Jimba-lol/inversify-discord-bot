import { Client, Message, VoiceState } from 'discord.js';
import { inject, injectable } from 'inversify';
import { MessageResponder } from './services/message-responder-service';
import { SYMBOLS } from '../const/symbols';
// import { MessageResponder } from './services/message-responder';

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;

    constructor(
        @inject(SYMBOLS.Client) client: Client,
        @inject(SYMBOLS.Token) token: string,
        @inject(SYMBOLS.MessageResponder) messageResponder: MessageResponder,
    ) {
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
    }

    public listen() {
        this.client.on('message', (message:Message) => {
            // ignore the message if from another bot, or if it does not mention this bot.
            if (message.author.bot || !message.mentions.has(this.client.user)) return;

            this.messageResponder.handle(message).then(() => {
                console.log("Response sent.");
            }).catch(() => {
                console.log("An exception occurred.");
            });
        });
        this.client.on('voiceStateUpdate', (oldState:VoiceState, newState:VoiceState) => {
            
        });
    }

    public logIn(): Promise<string> {
        return this.client.login(this.token);
    }
}