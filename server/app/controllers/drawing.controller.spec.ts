import { expect } from 'chai';
import { stub } from 'sinon';
import { Drawing } from '../../../common/communication/drawing';
import { DrawingService } from '../services/drawing.service';
import { MongoDbConnectionService } from '../services/mongodb-connection.service';

describe('/drawings', () => {
    it('#getAllDrawings should send all drawings if success', async (done: Mocha.Done) => {
        const drawingService = stub(new DrawingService(new MongoDbConnectionService()));
        const drawings: Drawing[] = [{
            id: '',
            name: 'name',
            tags: ['tag1'],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        }];
        drawingService.getAllDrawings.returns(new Promise<Drawing[]>((resolve) => resolve(drawings)));
        const res: Response = new Response();
        expect(res.body).to.equal(drawings);
        done();
    });

    it('#getAllDrawings should send status 500 if fails', async (done: Mocha.Done) => {
        const drawingService = stub(new DrawingService(new MongoDbConnectionService()));
        drawingService.getAllDrawings.returns(Promise.reject());
        const res: Response = new Response();
        expect(res.status).to.equal(500);
        done();
    });

    it('#setDrawing should add new drawing and return new drawing with new id if success', async (done: Mocha.Done) => {
        const drawingService = stub(new DrawingService(new MongoDbConnectionService()));
        const drawing: Drawing = {
            id: '',
            name: 'name',
            tags: ['tag1'],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        };
        drawingService.setDrawing.callsFake((d: Drawing) => {
            d.id = 'changedId';
            return new Promise<Drawing>((resolve) => resolve(d));
        });
        const res: Response = new Response();
        drawing.id = 'changedId';
        expect(res.body).to.equal(drawing);
        done();
    });

    it('#setDrawing should send status 500 if fails', async (done: Mocha.Done) => {
        const drawingService = stub(new DrawingService(new MongoDbConnectionService()));
        drawingService.setDrawing.returns(Promise.reject());
        const res: Response = new Response();
        expect(res.status).to.equal(500);
        done();
    });
});
