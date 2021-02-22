import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPatch } from 'inversify-express-utils';
import { Request } from 'express';
import { RobloxGame } from '../../model/roblox-game';
import { RobloxGameService } from '../services/roblox.service';
import { SYMBOLS } from '../../const/symbols'

@controller('/roblox')
export class RobloxController {
    private service: RobloxGameService;
    constructor(
        @inject(SYMBOLS.RobloxGameService) private robloxGameService: RobloxGameService
    ) { 
        this.service = robloxGameService;
    }

    @httpGet('/:id')
    public getByID(request: Request): Promise<RobloxGame> {
        return this.service.getById(request.params.id);
    }

    @httpGet('/latest')
    public getLatest(): Promise<RobloxGame> {
        return this.service.getLatest();
    }

    @httpGet('/')
    public getAll(): Promise<RobloxGame[]> {
        return this.service.getAll();
    }

    /**
     * POST endpoint for adding a RobloxGame to the database.
     * @param request must have parameters that have the making of a RobloxGame object. gameID, gameName, gameDesc, gameGenre, requestorID, timestamp
     * 
     */
    @httpPost('/')
    public post(request: Request): Promise<RobloxGame> {
        let game: RobloxGame = new RobloxGame(+request.params.gameID, request.params.gameName, request.params.gameDesc, request.params.gameGenre, request.params.requestorID, +request.params.timestamp);
        return this.service.post(game);
    }

    /**
     * Used when a user wants to chane the game that they're requesting.
     * @param request must have following params: gameID, gameName, gameDesc, gameGenre, reqeustorID
     */
    @httpPatch('/:id')
    public async patch(request: Request): Promise<RobloxGame> {
        let res: RobloxGame = await this.service.getByRequestorID(request.params.requestorID).then((res) => {
            res.gameID = +request.params.gameID,
            res.gameName = request.params.gameName,
            res.gameDesc = request.params.gameDesc,
            res.gameGenre = request.params.gameGenre
            return res;
        });
        return this.service.patch(res);
    }

    /**
     * 
     * @param request must include the id of the RobloxGame to be deleted.
     */
    @httpDelete('/:id')
    public deleteByID(request: Request): Promise<RobloxGame> {
        return this.service.deleteByID(request.params.id)
    }

    /**
     * Deletes the latest RobloxGame object
     */
    @httpDelete('/latest')
    public deleteLatest(): Promise<RobloxGame> {
        return this.service.deleteLatest();
    }

    // Will need a method to delete a RobloxGame by user.
}