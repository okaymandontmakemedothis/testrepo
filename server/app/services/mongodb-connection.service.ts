import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import 'reflect-metadata';
import { DATABASE_NAME, MONGODB_URL } from '../res/environement';

@injectable()
export class MongoDbConnectionService {
    async getMongoClient(url: string = MONGODB_URL): Promise<MongoClient> {
        return MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    getDatabaseName(): string { return DATABASE_NAME; }
}
