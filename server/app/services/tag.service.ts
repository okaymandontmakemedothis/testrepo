import { injectable } from 'inversify';
import { MongoClient, } from 'mongodb';
import 'reflect-metadata';
import { Tag } from '../../../common/communication/drawing';

const url = 'mongodb://localhost:27017/polydessin';
const client = MongoClient;

@injectable()
export class TagService {
    async getAllTags(): Promise<Tag[]> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const tags = db.collection('tags');
            return tags.find().toArray().then((arr) => {
                console.log(arr);
                mc.close();
                return arr;
            });
        });
    }
}
