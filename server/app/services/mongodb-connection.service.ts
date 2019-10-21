import { injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import 'reflect-metadata';
import { DATABASE_NAME, MONGODB_URL } from '../res/environement';

/// Factory de connection vers la base de donnée mongodb
@injectable()
export class MongoDbConnectionService {
    mongoClient = MongoClient;

    /// Retourne une connection vers l'instance monngoDb
    async getMongoClient(url: string = MONGODB_URL): Promise<MongoClient> {
        return this.mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    /// Retourne le nom de la base de donnée par défaut
    getDatabaseName(): string { return DATABASE_NAME; }
}
