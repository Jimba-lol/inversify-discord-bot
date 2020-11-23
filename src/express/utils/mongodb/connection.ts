import { Db, MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'reverbr8';

export class MongoDBConnection { 
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error, db: Db) => {
                return result(this.db);
            });
        }
    }

    public static connect(result: (error, db: Db) => void) {
        MongoClient.connect(url, (err, client) => {
            this.db = client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        })
    }
}