import { TestBed } from '@angular/core/testing';
import { EmitReturn } from '../hotkeys-constants';
import { HotkeysOutilService } from './hotkeys-outil.service';

describe('HotkeysOutilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysOutilService = TestBed.get(HotkeysOutilService);
    expect(service).toBeTruthy();
  });

  it('C should NOT emit', () => {
    let isNotCalled = true;

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe(() => { isNotCalled = false; });
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', { code: 'KeyC' });

    service.hotkeysOutil(event);

    expect(isNotCalled).toBeTruthy();
  });

  it('C should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyC' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.PENCIL);
  });

  it('W should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyW' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.BRUSH);
  });

  it('P should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyP' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('P');
  });

  it('Y should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyY' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('Y');
  });

  it('A should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyA' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('A');
  });

  it('1 should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Digit1' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.RECTANGLE);
  });

  it('1 (numpad) should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Numpad1' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.RECTANGLE);
  });

  it('2 should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Digit2' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('2');
  });

  it('2 (numpad) should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Numpad2' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('2');
  });

  it('3 should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Digit3' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('3');
  });

  it('3 (numpad) should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'Numpad3' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('3');
  });

  it('L should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyL' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('L');
  });

  it('T should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyT' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('T');
  });

  it('R should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyR' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe(EmitReturn.APPLICATEUR);
  });

  it('B should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyB' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('B');
  });

  it('E should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyE' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('E');
  });

  it('I should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyI' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('I');
  });

  it('S should emit', () => {
    let eventEmited = '';

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { code: 'KeyS' });

    service.hotkeysOutil(keyBoardEvent);

    expect(eventEmited).toBe('S');
  });

  it('F should not emit', () => {
    let isNotCalled = true;

    const service: HotkeysOutilService = new HotkeysOutilService();
    service.hotkeysOutilEmitter.subscribe(() => { isNotCalled = false; });

    const event = new KeyboardEvent('keydown', { code: 'KeyF' });

    service.hotkeysOutil(event);

    expect(isNotCalled).toBeTruthy();
  });
});
