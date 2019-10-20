import { expect } from 'chai';
import { stub } from 'sinon';
import { Drawing, Tag } from '../../../common/communication/drawing';
import { DrawingService } from './drawing.service';
import { MongoDbConnectionService } from './mongodb-connection.service';
import { MongoClient, Collection, Db } from 'mongodb';
import { TAG_COLLECTION, DRAWING_COLLECTION } from '../res/environement';
import Sinon = require('sinon');

describe('Testing drawing.service', () => {
    let mongoDbConnectionService: MongoDbConnectionService;
    let mongoDbConnectionServiceStub: Sinon.SinonStubbedInstance<MongoDbConnectionService>;
    beforeEach(() => {
        mongoDbConnectionService = new MongoDbConnectionService();
        mongoDbConnectionServiceStub = stub(mongoDbConnectionService);
        mongoDbConnectionServiceStub.getDatabaseName.returns('test');
        mongoDbConnectionServiceStub.getMongoClient.callThrough();
        mongoDbConnectionService.getMongoClient().then((mc: MongoClient) => {
            const db: Db = mc.db('test');
            const tagCollection: Collection<Tag> = db.collection(TAG_COLLECTION);
            const drawingsCollection: Collection<Drawing> = db.collection(DRAWING_COLLECTION);
            drawingsCollection.insertOne({
                id: '',
                name: 'name',
                tags: ['tag1'],
                width: 10,
                height: 10,
                backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
                svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
            });
            tagCollection.insertOne({ name: 'tag1', numberOfUses: 1 });
            mc.close();
        });
    });

    afterEach(() => {
        mongoDbConnectionService.getMongoClient().then((mc: MongoClient) => {
            const db: Db = mc.db(mongoDbConnectionService.getDatabaseName());
            //db.dropDatabase();
            mc.close();
        });
    });

    it('#getAllDrawings should return all drawings', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionServiceStub);
        drawingService.getAllDrawings().then((drawings: Drawing[]) => {
            expect(drawings);
            done();
        });
    });

    it('#setDrawing should set the new drawing', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionService);
        const drawing: Drawing = {
            id: '',
            name: 'name',
            tags: ['tag1', 'tag2'],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        };
        drawingService.setDrawing(drawing).then((d: Drawing) => {
            expect(d);
            expect(d.id).to.not.be('');
            done();
        });
    });
});
