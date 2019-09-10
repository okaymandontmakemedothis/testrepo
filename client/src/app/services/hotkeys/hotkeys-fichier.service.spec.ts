import { TestBed } from '@angular/core/testing';

import { HotkeysFichierService } from './hotkeys-fichier.service';

describe('HotkeysFichierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysFichierService = TestBed.get(HotkeysFichierService);
    expect(service).toBeTruthy();
  });
});
