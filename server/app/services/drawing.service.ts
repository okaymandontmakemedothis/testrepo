import { inject, injectable } from 'inversify';
import { Collection, Db, MongoClient } from 'mongodb';
import 'reflect-metadata';
import { Drawing, Tag } from '../../../common/communication/drawing';
import { DRAWING_COLLECTION, TAG_COLLECTION } from '../res/environement';
import Types from '../types';
import { MongoDbConnectionService } from './mongodb-connection.service';

/// Service pour offrir l'interaction avec la base de donnée de dessins
@injectable()
export class DrawingService {

    constructor(@inject(Types.MongoDbConnectionService) private mongoDbConnection: MongoDbConnectionService) {
    }

    /// retourne tous les dessins sur la base de donnée de mongodb
    async getAllDrawings(): Promise<Drawing[]> {
        return this.mongoDbConnection.getMongoClient().then(async (mc: MongoClient) => {
            const db: Db = mc.db(this.mongoDbConnection.getDatabaseName());
            const drawingsCollection: Collection<Drawing> = db.collection(DRAWING_COLLECTION);
            return drawingsCollection.find().toArray().then((arr) => {
                mc.close();
                return arr;
            });
        });
    }

    /// Ajoute un drawing dans la base de donnée et ajuste les tag en conséquence
    async setDrawing(drawing: Drawing): Promise<Drawing> {
        return this.mongoDbConnection.getMongoClient().then(async (mc: MongoClient) => {
            const db: Db = mc.db(this.mongoDbConnection.getDatabaseName());
            const tagCollection: Collection<Tag> = db.collection(TAG_COLLECTION);
            const drawingsCollection: Collection<Drawing> = db.collection(DRAWING_COLLECTION);
            console.log('Saving : \x1b[34m%s\x1b[0m', drawing.name);
            for (const tag of drawing.tags) {
                console.log('Verifying tag with name : \x1b[34m%s\x1b[0m', tag);
                const t: Tag | null = await tagCollection.findOne<Tag>({ name: { $eq: tag } });
                if (t) {
                    console.log('\x1b[34m%s\x1b[0m exist', t);
                    tagCollection.updateOne({ name: { $eq: tag } }, { $inc: { numberOfUses: 1 } }, (err, res) => {
                        if (err) {
                            console.log('\x1b[31m%s\x1b[0m', 'Updating error', tag);
                            throw err;
                        }
                        console.log('Tag \x1b[32m%s\x1b[0m has been incremented', tag);
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
                            console.log('Tag \x1b[32m%s\x1b[0m is now in the database', tag);
                        }
                    });
                }

            }
            console.log('Inserting the drawing : \x1b[34m%s\x1b[0m', drawing.name);
            drawingsCollection.insertOne(drawing, (err, res) => {
                if (err) {
                    console.log('\x1b[31m%s\x1b[0m', 'Inserting error :' + drawing.name);
                    throw err;
                }
                console.log('Drawing id \x1b[32m%s\x1b[0m inserted', res.insertedId);
                drawing.id = res.insertedId.toHexString();
            });
            mc.close();
            return drawing;
        });
    }
}
