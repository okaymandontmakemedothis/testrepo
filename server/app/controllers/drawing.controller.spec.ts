import { expect, request, use } from 'chai';
// tslint:disable-next-line: no-require-imports
import chaiHttp = require('chai-http');
import { Drawing } from '../../../common/communication/drawing';
import { Application } from '../app';
import { container } from '../inversify.config';
import Types from '../types';
import { DrawingServiceMock, DrawingServiceMockFail } from './drawing.controller.mock';

use(chaiHttp);
describe('drawing.controller', () => {
    describe('/drawings', () => {
        let app: Application;
        it('get / should send all drawings if success', (done: Mocha.Done) => {
            container.unbind(Types.DrawingService);
            container.bind(Types.DrawingService).to(DrawingServiceMock);
            app = container.get<Application>(Types.Application);
            const drawings: Drawing[] = [{
                id: '',
                name: 'name',
                tags: ['tag1'],
                width: 10,
                height: 10,
                backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
                svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
            }];
            request(app.app).get('/api/drawings').end((err, res) => {
                expect(res.body).to.eql(drawings);
                done();
            });
        });

        it('get / should send status 500 if fails', (done: Mocha.Done) => {
            container.unbind(Types.DrawingService);
            container.bind(Types.DrawingService).to(DrawingServiceMockFail);
            app = container.get<Application>(Types.Application);
            request(app.app).get('/api/drawings').end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
        });

        it('post / should add new drawing and return new drawing with new id if success', (done: Mocha.Done) => {
            container.unbind(Types.DrawingService);
            container.bind(Types.DrawingService).to(DrawingServiceMock);
            app = container.get<Application>(Types.Application);
            const drawing: Drawing = {
                id: '',
                name: 'name',
                tags: ['tag1'],
                width: 10,
                height: 10,
                backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
                svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
            };
            request(app.app).post('/api/drawings').type('json')
                .send(drawing).end((err, res) => {
                    drawing.id = 'changedId';
                    expect(res.body).to.eql(drawing);
                    done();
                });
        });

        it('post / should send status 500 if fails', (done: Mocha.Done) => {
            container.unbind(Types.DrawingService);
            container.bind(Types.DrawingService).to(DrawingServiceMockFail);
            app = container.get<Application>(Types.Application);
            const drawing: Drawing = {
                id: '',
                name: 'name',
                tags: ['tag1'],
                width: 10,
                height: 10,
                backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
                svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
            };
            request(app.app).post('/api/drawings').type('json')
                .send(drawing).end((err, res) => {
                    expect(res.status).to.eql(500);
                    done();
                });
        });
    });
});

