import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { GetDrawingRequestService } from './get-drawing-request.service';

describe('GetDrawingRequestService', () => {
  let injector: TestBed;
  let service: GetDrawingRequestService;
  let httpMock: HttpTestingController;

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

  it('should sebd request to getDrawing', async () => {

    service.getDrawings();

    httpMock.expectNone(`${environment.serverURL}/drawings/`);
    // expect(req.request.method).toBe('GET');
    // req.flush(test);

  });

  afterEach(() => {
    httpMock.verify();

  });
});
