import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../../const/symbols';
import { RobloxQueueService } from './roblox-queue-service';
//import { RobloxGameService } from '../../express/services/roblox-game-service';

@injectable()
export class MessageResponder {
    private robloxQueueService: RobloxQueueService;

    constructor(
        @inject(SYMBOLS.RobloxQueueService) robloxQueueService: RobloxQueueService
    ) {
        this.robloxQueueService = robloxQueueService;
    }

    /**
     * The handle method takes a Discord message object and matches it to a valid command.
     * Acts like a front controller
     * @param message A Discord message containing a bot command plus appropriate parameters
     */
    handle(message: Message): Promise<Message | Message[]> {
        // words[0] is the code for the mention to the bot.
        // words[1] is the actual first word after that, i.e. the command.
        let words = message.content.split(/\s/g);
        let command = words[1].toLowerCase();
        switch(command) {
            case "help":
                return message.reply("");
            case "roblox":
                // no need to regex, the method in robloxQueueService will regex it for you.
                this.robloxQueueService.queueRobloxGame(words[2], message.author.id)
                .then((robloxGame) => {
                    // temporary response.
                    return message.reply(JSON.stringify(robloxGame));
                }).catch(() => {
                    // cases: game already in queue, or user has too many games in queue.
                    // user has too many games in queue needs to be a setting that can be easily changed.
                    return message.reply("something went wrong when queueing. Are you sure that's a valid roblox link?");
                });
        }
        return Promise.reject();
    }
}