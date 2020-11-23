import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { RobloxGame } from '../../model/roblox-game';
import { SYMBOLS } from '../../const/symbols';

@injectable()
export class RobloxGameService {
    private mongo: MongoDBClient;

    constructor(
        @inject(SYMBOLS.MongoDBClient) mongo: MongoDBClient
    ) {
        this.mongo = mongo;
    }

    public getRobloxGames(): Promise<RobloxGame[]> {
        return new Promise<RobloxGame[]>((resolve, reject) => {
            this.mongo.find('RobloxGame', {}, (error, data: RobloxGame[]) => {
                resolve(data);
            });
        });
    }

    public postGame(game: RobloxGame): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.create('RobloxGame', game, (error: Error, game: RobloxGame) => {
                resolve(game);
            })
        })
    }
}