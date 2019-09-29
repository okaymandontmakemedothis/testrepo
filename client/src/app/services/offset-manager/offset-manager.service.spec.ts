import { TestBed } from '@angular/core/testing';

import { OffsetManagerService } from './offset-manager.service';

describe('OffsetManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OffsetManagerService = TestBed.get(OffsetManagerService);
    expect(service).toBeTruthy();
  });
});
