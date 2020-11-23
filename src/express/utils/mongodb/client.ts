import { Db, ObjectID } from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './connection';
import { RobloxGame } from '../../../model/roblox-game';

/**
 * MongoDB Client
 * Used to communicate directly with the MongoDB database instance.
 * Utilizes basic CRUD methods and more.
 */
@injectable()
export class MongoDBClient { 
    public db: Db;

    constructor() {
        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
        })
    }

    /**
     * CREATE
     * Puts the desired object into the desired collection in the database.
     * @param collection Name of the collection in the database
     * @param model The object to be inserted into the database
     * @param result callback function, takes error and data fields.
     */
    public create(collection: string, model: Object, result: (err: Error, data) => void): void {
        this.db.collection(collection).insertOne(model, (err: Error, insert) => {
            return result(err, insert.ops[0]);
        });
    }

    /**
     * UPDATE
     * Updates the object in the desired collection based on object ID
     * @param collection Name of the collection in the database
     * @param objectID The ID of the object in the database
     * @param model The updated model
     * @param result Callback
     */
    public update(collection: string, objectID: string, model: Object, result: (error, data) => void): void {
        this.db.collection(collection).updateOne(
            { _id: new ObjectID(objectID) },
            { $set: model },
            (err: Error, update) => result(err, model)
        );
    }

    /**
     * FIND MULTIPLE BY FILTER / FIND ALL
     * Finds objects based on collection and filter.
     * To find all, simply enter {} into the filter.
     * @param collection Name of the collection in the database
     * @param filter 
     * @param result 
     */
    public find(collection: string, filter: Object, result: (err: Error, data) => void): void {
        this.db.collection(collection).find(filter).toArray((err: Error, find) => {
            return result(err, find);
        });
    }

    /**
     * FIND ONE BY ID
     * Finds a single object based on the input ID
     * @param collection Name of the collection in the database
     * @param objectID 
     * @param result 
     */
    public findByID(collection: string, objectID: string, result: (err: Error, data) => void): void {
        this.db.collection(collection).find({ _id: new ObjectID(objectID) }).limit(1).toArray((err: Error, find) => {
            return result (err, find[0]);
        });
    }

    /**
     * FIND LATEST
     * Finds the latest entry based on the collection
     * @param collection Name of the collection in the database
     * @param result 
     */
    public findLatest(collection: string, result: (err: Error, data) => void): void {
        this.db.collection(collection).find().sort({"timestamp": -1}).limit(1).toArray((err: Error, find) => {
            return result (err, find[0]);
        });
    }

    /**
     * Deletes an object from the specified collection based on the given objectID
     * @param collection Name of the collection in the database
     * @param objectID 
     * @param result 
     */
    public delete(collection:string, objectID: string, result: (err: Error, data) => void): void {
        this.db.collection(collection).deleteOne({ _id: new ObjectID(objectID)}, (err: Error, remove) => {
            return result(err, remove);
        });
    }

    /**
     * Removes the latest entry in the collection based on its timestamp.
     * @param collection Name of the collection in the database
     * @param result 
     */
    public deleteLatest(collection: string, result: (err: Error, data) => void): void {
        this.findLatest(collection, (err, data) => {
            this.db.collection(collection).deleteOne({ _id: new ObjectID(data._id)}, (err: Error, remove) => {
                return result(err, remove);
            });
        });
        
    }
}