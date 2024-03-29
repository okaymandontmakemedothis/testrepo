import { expect } from 'chai';
import { Collection, Db, MongoClient } from 'mongodb';
import { SinonStubbedInstance, stub } from 'sinon';
import { Drawing, Tag } from '../../../common/communication/drawing';
import { DRAWING_COLLECTION, TAG_COLLECTION } from '../res/environement';
import { DrawingService } from './drawing.service';
import { MongoDbConnectionService } from './mongodb-connection.service';

describe('Testing drawing.service', () => {
    let mongoDbConnectionServiceStub: SinonStubbedInstance<MongoDbConnectionService>;
    before((done) => {
        mongoDbConnectionServiceStub = stub(new MongoDbConnectionService());
        mongoDbConnectionServiceStub.getDatabaseName.returns('test');
        mongoDbConnectionServiceStub.getMongoClient.callThrough();
        mongoDbConnectionServiceStub.getMongoClient().then((mc: MongoClient) => {
            const db: Db = mc.db(mongoDbConnectionServiceStub.getDatabaseName());
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

    it('#getAllDrawings should return all drawings', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionServiceStub);
        drawingService.getAllDrawings().then((drawings: Drawing[]) => {
            console.log(drawings);
            expect(drawings.length).to.be.greaterThan(0);
            done();
        });
    });

    it('#setDrawing should set the new drawing', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionServiceStub);
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
            done();
        });
    });

    it('#setDrawing should set the new drawing with new tags', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionServiceStub);
        const drawing: Drawing = {
            id: '',
            name: 'nameUnknownTag',
            tags: ['unknownTag'],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        };
        drawingService.setDrawing(drawing).then((d: Drawing) => {
            expect(d);
            done();
        });
    });

    it('#setDrawing should set the new drawing without any tags', (done) => {
        const drawingService: DrawingService = new DrawingService(mongoDbConnectionServiceStub);
        const drawing: Drawing = {
            id: '',
            name: 'nameUnknownTag',
            tags: [],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        };
        drawingService.setDrawing(drawing).then((d: Drawing) => {
            expect(d);
            done();
        });
    });
});
