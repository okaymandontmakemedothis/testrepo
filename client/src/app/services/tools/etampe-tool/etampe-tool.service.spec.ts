import { TestBed } from '@angular/core/testing';

import { EtampeToolService } from './etampe-tool.service';

describe('EtampeToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    expect(service).toBeTruthy();
  });
});
