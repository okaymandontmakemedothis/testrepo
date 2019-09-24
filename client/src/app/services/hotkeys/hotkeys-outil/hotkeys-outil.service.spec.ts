import { TestBed } from '@angular/core/testing';

import { HotkeysOutilService } from './hotkeys-outil.service';

describe('HotkeysOutilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysOutilService = TestBed.get(HotkeysOutilService);
    expect(service).toBeTruthy();
  });

  it('C should NOT emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', {code: 'KeyC'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('false');
  });

  it('C should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyC'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('c');
  });

  it('W should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyW'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('w');
  });

  it('P should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyP'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('p');
  });

  it('Y should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyY'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('y');
  });

  it('A should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyA'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('a');
  });

  it('1 should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Digit1'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('1');
  });

  it('1 (numpad) should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Numpad1'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('1');
  });

  it('2 should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Digit2'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('2');
  });

  it('2 (numpad) should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Numpad2'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('2');
  });

  it('3 should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Digit3'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('3');
  });

  it('3 (numpad) should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'Numpad3'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('3');
  });

  it('L should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyL'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('l');
  });

  it('T should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyT'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('t');
  });

  it('R should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyR'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('r');
  });

  it('B should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyB'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('b');
  });

  it('E should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyE'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('e');
  });

  it('I should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyI'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('i');
  });

  it('S should emit', () => {
    const service: HotkeysOutilService = new HotkeysOutilService();
    const event = new KeyboardEvent('keydown', {code: 'KeyS'});

    let result = service.hotkeysOutil(event);

    expect(result).toBe('s');
  });
});
