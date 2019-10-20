import { injectable } from 'inversify';
import { MongoClient, } from 'mongodb';
import 'reflect-metadata';
import { Tag } from '../../../common/communication/drawing';
import { DATABASE_NAME, MONGODB_URL, TAG_COLLECTION } from '../res/environement';

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
