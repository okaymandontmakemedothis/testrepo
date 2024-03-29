import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Tag } from '../../../../../common/communication/drawing';
import { TagService } from './tag.service';

describe('TagService', () => {
  let injector: TestBed;
  let service: TagService;
  let httpMock: HttpTestingController;
  const tag: Tag[] = [{
    name: 'tag1',
    numberOfUses: 1,
  }, {
    name: 'tag2',
    numberOfUses: 3,
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagService],
    });
    injector = getTestBed();
    service = injector.get(TagService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tag list', () => {

    service.retrieveTags().subscribe((value) => {
      expect(value).toEqual(['tag1', 'tag2']);
    });
    const req = httpMock.expectOne(`${environment.serverURL}/tags`);
    expect(req.request.method).toBe('GET');
    req.flush(tag);
  });

  it('should return error', () => {

    service.retrieveTags().subscribe((value) => {
      expect(value).toEqual([]);
    });
    const req = httpMock.expectOne(`${environment.serverURL}/tags`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('500'));
  });

  afterEach(() => {
    httpMock.verify();
  });
});
