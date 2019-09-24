import { TestBed } from '@angular/core/testing';

import { HotkeysSelectionService } from './hotkeys-selection.service';

describe('HotkeysSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotkeysSelectionService = TestBed.get(HotkeysSelectionService);
    expect(service).toBeTruthy();
  });

  it('CTRL-X should NOT emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    service.canExecute = false;

    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyX'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('false');
  });

  it('CTRL-X should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyX'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('x');
  });

  it('CTRL-C should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyC'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('c');
  });

  it('CTRL-V should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyV'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('v');
  });

  it('CTRL-D should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyD'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('d');
  });

  it('DELETE should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'Delete'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('del');
  });

  it('CTRL-A should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyA'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('a');
  });

  it('CTRL-SHIFT-Z should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, shiftKey:true, code: 'KeyZ'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('shz');
  });

  it('CTRL-Z should emit', () => {
    const service: HotkeysSelectionService = new HotkeysSelectionService();
    const event = new KeyboardEvent('keydown', {ctrlKey: true, code: 'KeyZ'});

    let result = service.hotkeysSelection(event);

    expect(result).toBe('z');
  });
});
