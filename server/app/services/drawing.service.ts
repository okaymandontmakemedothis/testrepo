import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import 'reflect-metadata';
import { Drawing } from '../../../common/communication/drawing';

const url = 'mongodb://localhost:27017/test';
const client = MongoClient;

@injectable()
export class DrawingService {
    async getAllDrawings(): Promise<Drawing[]> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('test');
            const test = db.collection('users');
            return test.find().toArray().then((arr) => {
                mc.close();
                return arr;
            });
        });
    }

    async getDrawingByName(name: string): Promise<Drawing> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('test');
            const test = db.collection('users');
            return test.findOne({ name: { $eq: name } }).then((value) => {
                mc.close();
                return value;
            });
        });
    }

    async setDrawing(d: Drawing): Promise<string> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('test');
            const test = db.collection('users');
            test.insertOne(d, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.result);
            });
            mc.close();
            return 'Test';
        });
    }

    async deleteDrawing(name: string): Promise<string> {
        return client.connect(url).then(async (mc: MongoClient) => {
            const db = mc.db('test');
            const test = db.collection('users');
            test.deleteOne({ name }, (err, res) => {
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
