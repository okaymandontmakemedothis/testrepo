import { TestBed } from '@angular/core/testing';

import { HotkeysSelectionService } from './hotkeys-selection.service';

describe('HotkeysSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysSelectionService = TestBed.get(HotkeysSelectionService);
    expect(service).toBeTruthy();
  });

  it('CTRL-X should NOT emit', () => {
    let isNotCalled = true;

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe(() => { isNotCalled = false; });
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyX' });

    service.hotkeysSelection(event);

    expect(isNotCalled).toBeTruthy();
  });

  it('CTRL-X should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyX' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CX');
  });

  it('CTRL-C should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyC' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CC');
  });

  it('CTRL-V should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyV' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CV');
  });

  it('CTRL-D should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyD' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CD');
  });

  it('DELETE should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'Delete' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('DEL');
  });

  it('CTRL-A should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyA' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CA');
  });

  it('CTRL-SHIFT-Z should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, code: 'KeyZ' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CSZ');
  });

  it('CTRL-Z should emit', () => {
    let eventEmited = '';

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe((event: string) => { eventEmited = event; });

    const keyBoardEvent = new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyZ' });

    service.hotkeysSelection(keyBoardEvent);

    expect(eventEmited).toBe('CZ');
  });

  it('F should not emit', () => {
    let isNotCalled = true;

    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.hotkeysSelectionEmitter.subscribe(() => { isNotCalled = false; });

    const event = new KeyboardEvent('keydown', { code: 'KeyF' });

    service.hotkeysSelection(event);

    expect(isNotCalled).toBeTruthy();
  });
});
