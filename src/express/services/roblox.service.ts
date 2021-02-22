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
    
    /**
     * Gets the RobloxGame from the database with matching id param
     * @param id the ID of the RobloxGame that you wish to get from the Database.
     */
    public getById(id: string): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.find('RobloxGame', id, (error: Error, game: RobloxGame) => {
                if (error) reject(error);
                resolve(game);
            });
        });
    }

    /**
     * 
     * @param id the gameID of the RobloxGame that you wish to return from DB
     */
    public getByRequestorID(id: string): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.find('RobloxGame',{requestorID: id},(error: Error, game: RobloxGame) => {
                if (error) reject(error);
                resolve(game);
            });
        });
    }

    /**
     * Gets the latest RobloxGame that was added to the database.
     */
    public getLatest(): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.findLatest('RobloxGame', (error: Error, game: RobloxGame) => {
                if (error) reject(error);
                resolve(game);
            });
        });
    }

    /**
     * Gets all RobloxGame objects in the database.
     */
    public getAll(): Promise<RobloxGame[]> {
        return new Promise<RobloxGame[]>((resolve, reject) => {
            this.mongo.find('RobloxGame', {}, (error, data: RobloxGame[]) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }

    /**
     * Adds a RobloxGame object to the database.
     * @param game the RobloxGame object to be added to the database
     */
    public post(game: RobloxGame): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.create('RobloxGame', game, (error: Error, game: RobloxGame) => {
                if (error) reject(error);
                resolve(game);
            });
        });
    }

    /**
     * updates the passed RobloxGame object.
     * @param game The RobloxGame to be updated. Ensure that the _id field is valid and exists in the database.
     */
    public patch(game: RobloxGame): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.update('Robloxgame', game._id, game, (error, game) => {
                if (error) reject(error);
                resolve(game);
            });
        });
    }

    /**
     * Deletes the object from the database with matching ID.
     * @param id the ID of the object to be deleted
     */
    public deleteByID(id: string): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.mongo.delete('RobloxGame', id, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }

    /**
     * Deletes the latest RobloxGame object in the database.
     */
    public deleteLatest(): Promise<RobloxGame> {
        return new Promise<RobloxGame>((resolve, reject) => {
            this.getLatest()
            .then((res) => {resolve(this.deleteByID(res._id))})
            .catch((error) => reject(error));
        });
    }
}