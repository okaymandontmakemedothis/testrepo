import { injectable } from 'inversify';
import { MongoClient, } from 'mongodb';
import 'reflect-metadata';
import { Tag } from '../../../common/communication/drawing';
import { DATABASE_NAME, MONGODB_URL, TAG_COLLECTION } from '../res/environement';

/// Service pour interagir avec les tag dans la base de donnée
@injectable()
export class TagService {
    /// Retourne tous les tags dans la base de données
    async getAllTags(): Promise<Tag[]> {
        return MongoClient.connect(MONGODB_URL).then(async (mc: MongoClient) => {
            const db = mc.db(DATABASE_NAME);
            const tags = db.collection(TAG_COLLECTION);
            return tags.find().toArray().then((arr) => {
                console.log(arr);
                mc.close();
                return arr;
            });
        });
    }
}
