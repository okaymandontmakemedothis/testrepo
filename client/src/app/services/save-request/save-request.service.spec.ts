import { TestBed } from '@angular/core/testing';

import { SaveRequestService } from './save-request.service';

describe('SaveRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveRequestService = TestBed.get(SaveRequestService);
    expect(service).toBeTruthy();
  });
});
