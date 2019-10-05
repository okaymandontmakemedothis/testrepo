import { injectable } from 'inversify';
import { MongoClient, ObjectId } from 'mongodb';
import 'reflect-metadata';
import { Drawing, Tag } from '../../../common/communication/drawing';

const url = 'mongodb://localhost:27017/polydessin';
const client = MongoClient;

@injectable()
export class DrawingService {
    async getAllDrawings(): Promise<Drawing[]> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const test = db.collection('drawings');
            return test.find().toArray().then((arr) => {
                mc.close();
                return arr;
            });
        });
    }
    async getDrawingsByTags(tagCollection: string[]): Promise<Drawing[]> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const test = db.collection('drawings');
            return test.find({tags: {$in: tagCollection}}).toArray().then((arr) => {
                mc.close();
                return arr;
            });
        });
    }
    async getDrawingsById(id: string): Promise<Drawing> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const test = db.collection('drawings');
            const objectId=new ObjectId(id)
            return test.findOne( objectId).then((value) => {
                mc.close();
                return value;
            });
        });
    }

    async getDrawingByName(name: string): Promise<Drawing> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const test = db.collection('drawings');
            return test.findOne({ name: { $eq: name } }).then((value) => {
                mc.close();
                return value;
            });
        });
    }

    async setDrawing(d: Drawing): Promise<string> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const tagCollection = db.collection('tags');
            const drawingsCollection = db.collection('drawings');
            console.log(d);
            for (const tag of d.tags) {
                await tagCollection.findOne({ name: { $eq: tag } }).then((t) => {
                    if (t) {
                        console.log(t + ' exist');
                        const nbUses = t.numberOfUses += 1;
                        tagCollection.updateOne({ name: { $eq: tag } }, { $set: { numberOfUses: nbUses } }, (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(res.result);
                        });
                    } else {
                        console.log(tag);
                        const newTag: Tag = { name: tag, numberOfUses: 1 };
                        tagCollection.insertOne(newTag, (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(res.result);
                        });
                    }
                });
            }

            drawingsCollection.insertOne(d, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.result);
            });
            mc.close();
            return 'Done';
        });
    }

    async deleteDrawing(name: string): Promise<string> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('polydessin');
            const tagCollection = db.collection('tags');
            const drawingsCollection = db.collection('drawings');
            let d: Drawing|undefined;
            await drawingsCollection.findOne({ name: { $eq: name } }).then((value: Drawing) => d = value);
            if (!d) {
                return 'err';
            }
            for (const tag of d.tags) {
                await tagCollection.findOne({ name: { $eq: tag } }).then((t) => {
                    if (t) {
                        console.log(t + ' exist');
                        const nbUses = t.numberOfUses -= 1;
                        tagCollection.updateOne({ name: { $eq: tag } }, { $set: { numberOfUses: nbUses } }, (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(res.result);
                        });
                    } else {
                        console.log('err');
                    }
                });
            }
            drawingsCollection.deleteOne({ name }, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.result);
            });
            mc.close();
            return 'Test';
        });
    }
}
