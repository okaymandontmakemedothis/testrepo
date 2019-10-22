import { expect } from 'chai';
import { Collection, Db, MongoClient } from 'mongodb';
import { SinonStubbedInstance, stub } from 'sinon';
import { Tag } from '../../../common/communication/drawing';
import { TAG_COLLECTION } from '../res/environement';
import { MongoDbConnectionService } from './mongodb-connection.service';
import { TagService } from './tag.service';

describe('Testing tag.service', () => {
    let mongoDbConnectionServiceStub: SinonStubbedInstance<MongoDbConnectionService>;
    before((done) => {
        mongoDbConnectionServiceStub = stub(new MongoDbConnectionService());
        mongoDbConnectionServiceStub.getDatabaseName.returns('test');
        mongoDbConnectionServiceStub.getMongoClient.callThrough();
        mongoDbConnectionServiceStub.getMongoClient().then((mc: MongoClient) => {
            const db: Db = mc.db(mongoDbConnectionServiceStub.getDatabaseName());
            const tagCollection: Collection<Tag> = db.collection(TAG_COLLECTION);
            tagCollection.insertOne({ name: 'tag1', numberOfUses: 1 });
            mc.close();
            done();
        });
    });

    after((done) => {
        mongoDbConnectionServiceStub.getMongoClient().then((mc: MongoClient) => {
            const db: Db = mc.db(mongoDbConnectionServiceStub.getDatabaseName());
            db.dropDatabase();
            mc.close();
            done();
        });
    });

    it('should return all tags', (done) => {
        const tagService: TagService = new TagService(mongoDbConnectionServiceStub);
        tagService.getAllTags().then((tags: Tag[]) => {
            expect(tags.length).to.be.greaterThan(0);
            done();
        });
    });
});
