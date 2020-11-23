import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request } from 'express';
import { RobloxGame } from '../../model/roblox-game';
import { RobloxGameService } from '../services/roblox-game-service';
import { SYMBOLS } from '../../const/symbols'

@controller('/roblox')
export class RobloxController {
    constructor(
        @inject(SYMBOLS.RobloxGameService) private robloxGameService: RobloxGameService
    ) { }

    @httpPost('/')
    public post(request: Request): Promise<RobloxGame> {
        return this.robloxGameService.postGame(request.body);
    }
}