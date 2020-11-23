import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPatch } from 'inversify-express-utils';
import { Request } from 'express';
import { RobloxGame } from '../../model/roblox-game';
import { RobloxGameService } from '../services/roblox-game-service';
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
        
    }

    @httpGet('/latest')
    public getLatest(request: Request): Promise<RobloxGame> {

    }

    @httpGet('/')
    public getAll(request: Request): Promise<RobloxGame[]> {

    }

    @httpPost('/')
    public post(request: Request): Promise<RobloxGame> {
        return this.robloxGameService.postGame(request.body);
    }

    @httpPatch('/:id')
    public patch(request: Request): Promise<RobloxGame> {

    }

    @httpDelete('/:id')
    public deleteByID(request: Request): Promise<RobloxGame> {

    }

    @httpDelete('/latest')
    public deleteLatest(request: Request): Promise<RobloxGame> {

    }
}