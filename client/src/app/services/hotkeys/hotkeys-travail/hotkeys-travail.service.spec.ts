import { TestBed } from '@angular/core/testing';

import { EmitReturn } from '../hotkeys-constants';
import { HotkeysTravailService } from './hotkeys-travail.service';

describe('HotkeysTravailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysTravailService = TestBed.get(HotkeysTravailService);
    expect(service).toBeTruthy();
  });

  it('CTRL-G should NOT emit', () => {
    let isNotCalled = true;

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe(() => { isNotCalled = false; });
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', { code: 'KeyG' });

    service.hotkeysTravail(event);

    expect(isNotCalled).toBeTruthy();
  });

  it('CTRL-G should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyG' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.ENABLE_GRID);
  });

  it('CTRL-M should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyM' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.DISABLE_GRID);
  });

  it('+ (numpad) should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'NumpadAdd' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.ADD5_GRID);
  });

  it('+ (SHIFT-=) should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { shiftKey: true, code: 'Equal' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.ADD5_GRID);
  });

  it('- (numpad) should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'NumpadSubtract' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.SUB5_GRID);
  });

  it('when "-" is pressed should emit', () => {
    let eventEmited = '';

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Minus' });

    service.hotkeysTravail(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.SUB5_GRID);
  });

  it('F should not emit', () => {
    let isNotCalled = true;

    const service: HotkeysTravailService = new HotkeysTravailService();
    service.hotkeysTravailEmitter.subscribe(() => { isNotCalled = false; });

    const event = new KeyboardEvent('keydown', { code: 'KeyF' });

    service.hotkeysTravail(event);

    expect(isNotCalled).toBeTruthy();
  });
});
