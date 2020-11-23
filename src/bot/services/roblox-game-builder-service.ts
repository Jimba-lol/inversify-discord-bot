import { injectable } from 'inversify';
import { get } from 'https';
import { RobloxGame } from '../../model/roblox-game';
import { ClientRequest } from 'http';

/**
 * Service for creation of RobloxGame objects with appropriate information.
 * Contacts the Roblox API for information on a game using its PlaceID, denoted here as gameID.
 */
@injectable()
export class RobloxGameBuilderService {
    private host = 'https://www.rprxy.xyz';
    private path = '/places/api-get-details?assetId=';
    constructor() {}

    /**
     * This function returns a Promise<RobloxGame> with correct information according to the gameID
     * @param gameID the PlaceID of the roblox game to be added to the queue
     * @param userID the Discord UserID of whomever invoked this command
     */
    public createRobloxGame(gameID: string, userID: string): Promise<RobloxGame> {
        // contact the roblox game API
        let chunks = [];
        return new Promise((resolve, reject) => {
            get(this.host + this.path + gameID, (response) => {
                // reject if status code is not 200:
                if (response.statusCode != 200) return Error("Status code from " + this.host + " is not 200.");
                // add each buffer chunk to the chunks array:
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                response.on('end', () => {
                    // Convert chunks into a single buffer, then into an object:
                    let buffer = '';
                    chunks.forEach(chunk => {
                        buffer += chunk.toString();
                    });
                    let obj = JSON.parse(buffer);
                    // if the obj is empty, we reject:
                    if (Object.keys(obj).length === 0) reject("Empty object was returned from " + this.host);
                    // obj is not empty, we resolve:
                    resolve(
                        new RobloxGame(
                            +gameID,
                            obj.Name,
                            obj.Description,
                            obj.AssetGenre,
                            userID,
                            Date.now()
                        )
                    );
                });
            }).on('error', (err) => {
                let msg = `there was an error with the roblox place request. ${err.message}`;
                console.log(msg);
                reject(msg);
            });
        });
    }
}

