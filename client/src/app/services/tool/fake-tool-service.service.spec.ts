import { TestBed } from '@angular/core/testing';

import { FakeToolServiceService } from './fake-tool-service.service';

describe('FakeToolServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeToolServiceService = TestBed.get(FakeToolServiceService);
    expect(service).toBeTruthy();
  });
});
