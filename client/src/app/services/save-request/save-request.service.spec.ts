import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Drawing } from '../../../../../common/communication/drawing';
import { Message } from '../../../../../common/communication/message';
import { SaveRequestService } from './save-request.service';

describe('SaveRequestService', () => {
  let injector: TestBed;
  let service: SaveRequestService;
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
      providers: [SaveRequestService],
    });
    injector = getTestBed();
    service = injector.get(SaveRequestService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return void promise', () => {
    const test: Message = { title: 'test', body: 'post' };
    service.addDrawing(drawing).then(() => {
      expect(true).toBe(true);
    });
    const req = httpMock.expectOne(`${environment.serverURL}/drawings`);
    expect(req.request.method).toBe('POST');
    req.flush(test);
  });

  afterEach(() => {
    httpMock.verify();

  });
});
