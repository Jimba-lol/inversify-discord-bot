import { Db, ObjectID } from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './connection';
import { RobloxGame } from '../../../model/roblox-game';

@injectable()
export class MongoDBClient { 
    public db: Db;

    constructor() {
        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
        })
    }

    public create(collection: string, model: Object, result: (err: Error, data) => void): void {
        this.db.collection(collection).insertOne(model, (err: Error, insert) => {
            return result(err, insert.ops[0]);
        });
    }

    public update(collection: string, objectID: string, model: Object, result: (error, data) => void): void {
        this.db.collection(collection).updateOne(
            { _id: new ObjectID(objectID) },
            { $set: model },
            (err: Error, update) => result(err, model)
        );
    }

    public find(collection: string, filter: Object, result: (err: Error, data) => void): void {
        this.db.collection(collection).find(filter).toArray((err: Error, find) => {
            return result(err, find);
        });
    }

    public findByID(collection: string, objectID: string, result: (err: Error, data) => void): void {
        this.db.collection(collection).find({ _id: new ObjectID(objectID) }).limit(1).toArray((err: Error, find) => {
            return result (err, find[0]);
        });
    }

    public delete(collection:string, objectID: string, result: (err: Error, data) => void): void {
        this.db.collection(collection).deleteOne({ _id: new ObjectID(objectID)}, (err: Error, remove) => {
            return result(err, remove);
        });
    }
}