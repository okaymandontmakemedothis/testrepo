import { injectable } from 'inversify';
import { MongoClient, } from 'mongodb';
import 'reflect-metadata';
import { Tag } from '../../../common/communication/drawing';
import { MONGODB_URL, DATABASE_NAME, TAG_COLLECTION } from '../res/environement';

@injectable()
export class TagService {
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
