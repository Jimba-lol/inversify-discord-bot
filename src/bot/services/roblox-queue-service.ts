import { inject, injectable } from 'inversify';
import { SYMBOLS } from '../../const/symbols';
import { RobloxGame } from '../../model/roblox-game';
import { RobloxGameBuilderService } from './roblox-game-builder-service';

/**
 * This Service adds RobloxGame objects to the game queue.
 */
@injectable()
export class RobloxQueueService {
    private robloxURL = "https://www.roblox.com/games/";
    private robloxGameBuilderService: RobloxGameBuilderService;

    constructor(
        @inject(SYMBOLS.RobloxGameBuilderService) robloxGameBuilderService: RobloxGameBuilderService,
    ) {
        this.robloxGameBuilderService = robloxGameBuilderService;
    }

    /**
     * This function will add a RobloxGame to the RobloxGame queue.
     * It extracts the gameID from the URL, then creates an appropriate RobloxGame object.
     * It then persists this RobloxGame object to the queue, by contacting the Express Server.
     * @param url The full URL of the Roblox game to be added to the queue
     * @param username The username of the Discord User who requested the Roblox Game
     */
    public queueRobloxGame(url: string, userID: string): Promise<RobloxGame> {
        // extract the gameID
        url = url.replace(this.robloxURL, "");
        let gameID = url.split(/\//)[0];
        return new Promise((resolve, reject) => {
            // create the RobloxGame object
            let game = this.robloxGameBuilderService.createRobloxGame(gameID, userID).then((game) => {
                // persist the game TODO

                // resolve
                resolve(game);
            }).catch((err) => {
                console.log("roblox-queue-service error: " + err);
                reject(err);
            });
        });

    }
}