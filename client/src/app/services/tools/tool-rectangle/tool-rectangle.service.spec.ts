import { TestBed } from '@angular/core/testing';

import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { ToolRectangleService } from './tool-rectangle.service';

describe('ToolRectangleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    expect(service).toBeTruthy();
  });

  it('should set square with shift', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    service.object = new RectangleObject(0, 0, 0, '');

    const spyKeyDown = spyOn(service, 'setSquare').and.callThrough();

    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });

    window.dispatchEvent(eventKeyDown);

    expect(spyKeyDown).toHaveBeenCalled();
  });

  it('should unset square with unshift', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    service.object = new RectangleObject(0, 0, 0, '');

    const spyKeyUp = spyOn(service, 'unsetSquare').and.callThrough();

    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: true });

    window.dispatchEvent(eventKeyUp);

    expect(spyKeyUp).toHaveBeenCalled();
  });

  it('should create un object on mouse press', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    const eventMouseDown = new MouseEvent('mousedown');
    if (!service.object) {
      service.onPressed(eventMouseDown);
    } else {
      service.object = null;
    }

    expect(service.object).not.toBeNull();
  });

  it('should put object to null on mouse up', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(0, 0, 0, '');

    const eventMouseUp = new MouseEvent('mouseup');

    if (service.object) {
      service.onRelease(eventMouseUp);
    }

    expect(service.object).toBeNull();
  });

  it('should set size of object on mouse move', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(0, 0, 0, '');

    const spyMouseMove = spyOn(service, 'setSize').and.callThrough();

    const eventMouseMove = new MouseEvent('mouseup');

    service.onMove(eventMouseMove);

    expect(spyMouseMove).toHaveBeenCalled();
  });

  it('should NOT set size of object on mouse move', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    const spyMouseMove = spyOn(service, 'setSize').and.callThrough();

    const eventMouseMove = new MouseEvent('mouseup');

    service.onMove(eventMouseMove);

    expect(spyMouseMove).not.toHaveBeenCalled();
  });

  it('should set square', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    const spySetSquare = spyOn(service, 'setSize').and.callThrough();

    service.setSquare();

    expect(spySetSquare).toHaveBeenCalled();
  });

  it('should unset square', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    const spyUnsetSquare = spyOn(service, 'setSize').and.callThrough();

    service.unsetSquare();

    expect(spyUnsetSquare).toHaveBeenCalled();
  });

  it('should put width and height positive when they are negative', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(100, 100, 0, '');

    service.setSize(50, 50);

    expect(service.object.height).toBeGreaterThanOrEqual(0);
    expect(service.object.width).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive when they are negative on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(100, 100, 0, '');
    service.setSquare();

    service.setSize(50, 30);

    expect(service.object.height).toEqual(service.object.width);
    expect(service.object.height).toBeGreaterThanOrEqual(0);

    service.setSize(30, 50);

    expect(service.object.height).toEqual(service.object.width);
    expect(service.object.height).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive on square mode for Y', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(100, 100, 0, '');
    service.setSquare();

    service.setSize(110, 150);

    expect(service.object.height).toEqual(service.object.width);

    service.setSize(110, 50);

    expect(service.object.height).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive on square mode for X', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    service.object = new RectangleObject(100, 100, 0, '');
    service.setSquare();

    service.setSize(150, 110);

    expect(service.object.height).toEqual(service.object.width);

    service.setSize(50, 110);

    expect(service.object.width).toBeGreaterThanOrEqual(0);
  });

});
