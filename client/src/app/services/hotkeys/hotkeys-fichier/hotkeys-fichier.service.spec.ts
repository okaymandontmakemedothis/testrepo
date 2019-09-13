import { TestBed } from '@angular/core/testing';

import { HotkeysFichierService } from './hotkeys-fichier.service';
import '../hotkeys-constants';

describe('HotkeysFichierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysFichierService = TestBed.get(HotkeysFichierService);
    expect(service).toBeTruthy();
  });

  it('ctrl+d should emit', () => {
    const service: HotkeysFichierService = new HotkeysFichierService();
    service.dialog.subscribe(() => {isCalled = true;})
    let isCalled: boolean = false;
    const event = new KeyboardEvent('keydown', {ctrlKey:true, key: 'd'});
    document.dispatchEvent(event);

    let tmp = (ev:KeyboardEvent) => {service.hotkeysFichier(ev)};

    tmp(event);

    expect(isCalled).toBeTruthy();
  });

});
