import { expect } from 'chai';
import { stub } from 'sinon';
import { DATABASE_NAME } from '../res/environement';
import { MongoDbConnectionService } from './mongodb-connection.service';

describe('Testing mongodb-connnection.service', () => {
    it('#getDatabaseName should return DATABASE_NAME', (done) => {
        const mongoService: MongoDbConnectionService = new MongoDbConnectionService();
        expect(mongoService.getDatabaseName()).to.equal(DATABASE_NAME);
        done();
    });

    it('#getMongoClient should return a connect mongoClient', (done) => {
        const mongoService: MongoDbConnectionService = new MongoDbConnectionService();
        const mockMS = stub(mongoService.mongoClient, 'connect');
        mockMS.returns();
        expect(mockMS.calledOnce).to.be.equal(true);
        done();
    });
});
