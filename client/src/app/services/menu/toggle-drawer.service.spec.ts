import { TestBed } from '@angular/core/testing';

import { ToggleDrawerService } from './toggle-drawer.service';

describe('ToggleDrawerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleDrawerService = TestBed.get(ToggleDrawerService);
    expect(service).toBeTruthy();
  });
});
