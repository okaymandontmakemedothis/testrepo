import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { SaveDrawingService } from './save-drawing.service';

describe('SaveDrawingService', () => {
  let injector: TestBed;
  let service: SaveDrawingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SaveDrawingService],
    });
    injector = getTestBed();
    service = injector.get(SaveDrawingService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should return all tags', () => {
    expect(service.getAllTags()).toEqual(['Tag2', 'Tag3', 'Tag1', 'Tag4', 'Tag5']);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
