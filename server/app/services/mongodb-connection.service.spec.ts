import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import { spy } from 'sinon';
import { DATABASE_NAME } from '../res/environement';
import { MongoDbConnectionService } from './mongodb-connection.service';

describe('Testing mongodb-connnection.service', () => {
    it('#getDatabaseName should return DATABASE_NAME', (done) => {
        const mongoService: MongoDbConnectionService = new MongoDbConnectionService();
        expect(mongoService.getDatabaseName()).to.equal(DATABASE_NAME);
        done();
    });

    it('#getMongoClient should return a connect mongoClient', async (done) => {
        const mongoService: MongoDbConnectionService = new MongoDbConnectionService();
        const mongoClient = MongoClient;
        const connect = spy(mongoClient, 'connect');
        mongoService.getMongoClient();
        expect(connect.calledOnce).to.be.equal(true);
        done();
    });
});
