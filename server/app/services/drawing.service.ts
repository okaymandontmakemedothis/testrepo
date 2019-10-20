import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import 'reflect-metadata';
import { Drawing, Tag } from '../../../common/communication/drawing';
import { DATABASE_NAME, DRAWING_COLLECTION, MONGODB_URL, TAG_COLLECTION } from '../res/environement';

@injectable()
export class DrawingService {

    /// retourne tous les dessins sur la base de donnée de mongodb
    async getAllDrawings(): Promise<Drawing[]> {
        return MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
            const db = mc.db(DATABASE_NAME);
            const drawingsCollection = db.collection(DRAWING_COLLECTION);
            return drawingsCollection.find().toArray().then((arr) => {
                mc.close();
                return arr;
            });
        });
    }

    /// Ajoute un drawing dans la base de donnée et ajuste les tag en conséquence
    async setDrawing(drawing: Drawing): Promise<Drawing> {
        return MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
            const db = mc.db(DATABASE_NAME);
            const tagCollection = db.collection(TAG_COLLECTION);
            const drawingsCollection = db.collection(DRAWING_COLLECTION);
            console.log('Saving : \x1b[34m%s\x1b[0m', drawing.name);
            for (const tag of drawing.tags) {
                console.log('Verifying tag with name : \x1b[34m%s\x1b[0m', tag);
                const t: Tag | null = await tagCollection.findOne<Tag>({ name: { $eq: tag } });
                if (t) {
                    console.log('\x1b[34m%s\x1b[0m exist', t);
                    tagCollection.updateOne({ name: { $eq: tag } }, { $inc: { numberOfUses: 1 } }, (err, res) => {
                        if (err) {
                            throw err;
                        }
                        console.log(res);
                    });
                } else {
                    console.log(tag + 'does not exist in the database');
                    const newTag: Tag = { name: tag, numberOfUses: 1 };
                    console.log('Initialising \x1b[32m%s\x1b[0m in the database', tag);
                    tagCollection.insertOne(newTag, (err, res) => {
                        if (err) {
                            console.log('\x1b[31m%s\x1b[0m', 'Inserting error :' + newTag.name);
                            throw err;
                        } else {
                            console.log(res.result);
                        }
                    });
                }

            }
            console.log('Inserting the drawing : \x1b[34m%s\x1b[0m', drawing.name);
            const d: Drawing | null = await drawingsCollection.findOne<Drawing>({ id: { $eq: drawing.id } });
            if (d && drawing.id) {
                console.log('Drawing \x1b[34m%s\x1b[0m exist with drawing id \x1b[34m%s\x1b[0m', drawing.name, drawing.id);
                drawingsCollection.updateOne({ id: drawing.id }, { $set: drawing }, (err, res) => {
                    if (err) {
                        console.error('\x1b[31m%s\x1b[0m', 'Updating error :' + drawing.name);
                        console.error(err);
                        throw err;
                    }
                    console.log('Drawing id \x1b[32m%s\x1b[0m updating', res.upsertedId);
                });
            } else {
                console.log('Drawing ' + drawing.id + 'does not exist in the database');
                drawingsCollection.insertOne(drawing, (err, res) => {
                    if (err) {
                        console.log('\x1b[31m%s\x1b[0m', 'Inserting error :' + drawing.name);
                        throw err;
                    }
                    console.log('Drawing id \x1b[32m%s\x1b[0m inserted', res.insertedId);
                    drawing.id = res.insertedId.toHexString();
                });
            }
            mc.close();
            return drawing;
        });
    }

    // async getDrawingsByTags(tagCollection: string[]): Promise<Drawing[]> {
    //     return mongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
    //         const db = mc.db(DATABASE_NAME);
    //         const drawingsCollection = db.collection(DRAWING_COLLECTION);
    //         return drawingsCollection.find({ tags: { $in: tagCollection } }).toArray().then((arr) => {
    //             mc.close();
    //             return arr;
    //         });
    //     });
    // }

    // async getDrawingById(id: string): Promise<Drawing> {
    //     return mongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
    //         const db = mc.db(DATABASE_NAME);
    //         const drawingsCollection = db.collection(DRAWING_COLLECTION);
    //         const objectId = new ObjectId(id);
    //         return drawingsCollection.findOne({ _id: objectId }).then((value) => {
    //             mc.close();
    //             return value;
    //         });
    //     });
    // }

    // async getDrawingByName(name: string): Promise<Drawing> {
    //     return mongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
    //         const db = mc.db(DATABASE_NAME);
    //         const drawingsCollection = db.collection(DRAWING_COLLECTION);
    //         return drawingsCollection.findOne({ name: { $eq: name } }).then((value) => {
    //             mc.close();
    //             return value;
    //         });
    //     });
    // }

    // async deleteDrawing(name: string): Promise<string> {
    //     return mongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (mc: MongoClient) => {
    //         const db = mc.db(DATABASE_NAME);
    //         const tagCollection = db.collection(TAG_COLLECTION);
    //         const drawingsCollection = db.collection(DRAWING_COLLECTION);
    //         const d = await drawingsCollection.findOne({ name: { $eq: name } }).then((value: Drawing) => value);
    //         if (!d) {
    //             return 'err';
    //         }
    //         for (const tag of d.tags) {
    //             const t: Tag | null = await tagCollection.findOne({ name: { $eq: tag } });
    //             if (t) {
    //                 console.log(t + ' exist');
    //                 const nbUses = t.numberOfUses -= 1;
    //                 tagCollection.updateOne({ name: { $eq: tag } }, { $set: { numberOfUses: nbUses } }, (err, res) => {
    //                     if (err) {
    //                         throw err;
    //                     }
    //                     console.log(res.result);
    //                 });
    //             } else {
    //                 console.log('err');
    //             }

    //         }
    //         drawingsCollection.deleteOne({ name }, (err, res) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             console.log(res.result);
    //         });
    //         mc.close();
    //         return 'Test';
    //     });
    // }
}
