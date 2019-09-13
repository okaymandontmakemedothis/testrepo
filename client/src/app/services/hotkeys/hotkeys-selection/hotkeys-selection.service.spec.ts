import { TestBed } from '@angular/core/testing';

import { HotkeysSelectionService } from './hotkeys-selection.service';

describe('HotkeysSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysSelectionService = TestBed.get(HotkeysSelectionService);
    expect(service).toBeTruthy();
  });
});
