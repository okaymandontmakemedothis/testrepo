import { TestBed } from '@angular/core/testing';

import { FetcherService } from './fetcher.service';

describe('IconFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetcherService = TestBed.get(FetcherService);
    expect(service).toBeTruthy();
  });
});
