import { inject, injectable } from 'inversify';
import { MongoClient, } from 'mongodb';
import 'reflect-metadata';
import { Tag } from '../../../common/communication/drawing';
import { DATABASE_NAME, TAG_COLLECTION } from '../res/environement';
import Types from '../types';
import { MongoDbConnectionService } from './mongodb-connection.service';

/// Service pour interagir avec les tag dans la base de donnée
@injectable()
export class TagService {

    constructor(@inject(Types.MongoDbConnectionService) private mongoDbConnection: MongoDbConnectionService) { }

    /// Retourne tous les tags dans la base de données
    async getAllTags(): Promise<Tag[]> {
        return this.mongoDbConnection.getMongoClient().then(async (mc: MongoClient) => {
            const db = mc.db(DATABASE_NAME);
            const tags = db.collection(TAG_COLLECTION);
            console.log('Request for all the tags');
            return tags.find().toArray().then((arr) => {
                mc.close();
                return arr;
            }).catch((reason) => {
                mc.close();
                throw reason;
            });
        });
    }
}
