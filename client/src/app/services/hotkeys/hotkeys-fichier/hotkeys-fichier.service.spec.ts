import { TestBed } from '@angular/core/testing';

import '../hotkeys-constants';
import { HotkeysFichierService } from './hotkeys-fichier.service';

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
    let eventEmited = '';

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyO' });

    service.hotkeysFichier(keyBoardEvent);

    expect(eventEmited).toBe(emitReturn.NEW_DRAWING);
  });

  it('CTRL-S should emit', () => {
    let eventEmited = '';

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyS' });

    service.hotkeysFichier(keyBoardEvent);

    expect(eventEmited).toBe('CS');
  });

  it('CTRL-G should emit', () => {
    let eventEmited = '';

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyG' });

    service.hotkeysFichier(keyBoardEvent);

    expect(eventEmited).toBe('CG');
  });

  it('CTRL-E should emit', () => {
    let eventEmited = '';

    const service: HotkeysFichierService = new HotkeysFichierService();
    service.hotkeysFichierEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyE' });

    service.hotkeysFichier(keyBoardEvent);

    expect(eventEmited).toBe('CE');
  });

});
