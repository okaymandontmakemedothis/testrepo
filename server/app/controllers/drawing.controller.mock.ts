import { injectable } from 'inversify';
import { Drawing } from '../../../common/communication/drawing';

@injectable()
export class DrawingServiceMock {
    getAllDrawings(): Promise<Drawing[]> {
        return new Promise<Drawing[]>((resolve) => resolve([{
            id: '',
            name: 'name',
            tags: ['tag1'],
            width: 10,
            height: 10,
            backGroundColor: { rgb: { r: 200, g: 100, b: 0 }, a: 0.75 },
            svg: '<rect x="1" y="1" width="1" height="1" id="1"></rect>',
        }]));
    }

    setDrawing(drawing: Drawing): Promise<Drawing> {
        drawing.id = 'changedId';
        return new Promise<Drawing>((resolve) => resolve(drawing));
    }
}

// tslint:disable-next-line: max-classes-per-file
@injectable()
export class DrawingServiceMockFail {
    getAllDrawings(): Promise<Drawing[]> {
        throw Error();
    }

    setDrawing(drawing: Drawing): Promise<Drawing> {
        throw Error();
    }
}
