import { TestBed } from '@angular/core/testing';

import { HotkeysFichierService } from './hotkeys-fichier.service';
import '../hotkeys-constants';

describe('HotkeysFichierService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysFichierService = TestBed.get(HotkeysFichierService);
    expect(service).toBeTruthy();
  });

  it('CTRL-O should NOT emit', () => {
    let isNotCalled = true;

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe(() => { isNotCalled = false; });
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyO' });

    service.hotkeysFichier(event);

    expect(isNotCalled).toBeTruthy();
  });

  it('CTRL-O should emit', () => {
    let isCalled = false;

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe(() => { isCalled = true; });

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyO' });

    service.hotkeysFichier(event);

    expect(isCalled).toBeTruthy();
  });

  it('CTRL-S should emit', () => {
    let isCalled = false;

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe(() => { isCalled = true; });

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyS' });

    service.hotkeysFichier(event);

    expect(isCalled).toBeTruthy();
  });

  it('CTRL-G should emit', () => {
    let isCalled = false;

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe(() => { isCalled = true; });

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyG' });

    service.hotkeysFichier(event);

    expect(isCalled).toBeTruthy();
  });

  it('CTRL-E should emit', () => {
    let isCalled = false;

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe(() => { isCalled = true; });

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyE' });

    service.hotkeysFichier(event);

    expect(isCalled).toBeTruthy();
  });

});
