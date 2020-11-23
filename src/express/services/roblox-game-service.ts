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
    
    public getById(id: string): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.find('RobloxGame', id, (error: Error, game: RobloxGame) => {
                resolve(game);
            })
        })
    }

    public getLatest(): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            // this.mongo.
            // TODO, IN PROGRESS
        })
    }

    public getAll(): Promise<RobloxGame[]> {
        return new Promise<RobloxGame[]>((resolve, reject) => {
            this.mongo.find('RobloxGame', {}, (error, data: RobloxGame[]) => {
                resolve(data);
            });
        });
    }

    public post(game: RobloxGame): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.create('RobloxGame', game, (error: Error, game: RobloxGame) => {
                resolve(game);
            })
        })
    }

    // does this need an ID input as well?
    public patch(game: RobloxGame): Promise<RobloxGame> {

    }

    public deleteByID(id: string): Promise<RobloxGame> {

    }

    public deleteLatest(): Promise<RobloxGame> {

    }
}