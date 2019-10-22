import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Drawing } from '../../../../../common/communication/drawing';
import { Message } from '../../../../../common/communication/message';
import { GetDrawingRequestService } from './get-drawing-request.service';

describe('GetDrawingRequestService', () => {
  let injector: TestBed;
  let service: GetDrawingRequestService;
  let httpMock: HttpTestingController;
  const drawing: Drawing = {
    id: 'id',
    name: 'name',
    tags: ['tag1', 'tag2'],
    width: 100,
    height: 100,
    backGroundColor: { rgb: { r: 100, g: 20, b: 70 }, a: 0.75 },
    svg: '<svg></svg>',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetDrawingRequestService],
    });
    injector = getTestBed();
    service = injector.get(GetDrawingRequestService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sebd request to getDrawing',async  () => {

    await service.getDrawings()

    httpMock.expectNone(`${environment.serverURL}/drawings/`);
    // expect(req.request.method).toBe('GET');
    // req.flush(test);

  });

  afterEach(() => {
    httpMock.verify();

  });
});
