import { expect } from 'chai';
import { Tag } from '../../../common/communication/drawing';
import { TagService } from './tag.service';
import { MongoDbConnectionService } from './mongodb-connection.service';
import { DATABASE_NAME } from '../res/environement';
import { mock, stub } from 'sinon';

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
