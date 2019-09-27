import { TestBed } from '@angular/core/testing';

import { HotkeysTravailService } from './hotkeys-travail.service';

describe('HotkeysTravailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysTravailService = TestBed.get(HotkeysTravailService);
    expect(service).toBeTruthy();
  });

  it('CTRL-G should NOT emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyG'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('false');
  });

  it('CTRL-G should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyG'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('g');
  });

  it('CTRL-M should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyM'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('m');
  });

  it('+ (numpad) should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {code: 'NumpadAdd'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('add');
  });

  it('+ (SHIFT-=) should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {shiftKey: true, code: 'Equal'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('add');
  });

  it('- (numpad) should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {code: 'NumpadSubtract'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('min');
  });

  it('- should emit', () => {
    const service: HotkeysTravailService = new HotkeysTravailService();
    const event = new KeyboardEvent('keydown', {code: 'Minus'});

    let result = service.hotkeysTravail(event);

    expect(result).toBe('min');
  });
});