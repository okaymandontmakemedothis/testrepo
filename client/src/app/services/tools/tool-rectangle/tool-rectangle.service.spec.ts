import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolRectangleService } from './tool-rectangle.service';
// import { ToolsColorService } from '../../tools-color/tools-color.service';
// import { ToolRectangleService } from './tool-rectangle.service';

describe('ToolRectangleService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  // let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  const renderer2Mock = jasmine.createSpyObj('renderer2Mock', [
    'destroy',
    'createElement',
    'createComment',
    'createText',
    'destroyNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'selectRootElement',
    'parentNode',
    'nextSibling',
    'setAttribute',
    'removeAttribute',
    'addClass',
    'removeClass',
    'setStyle',
    'removeStyle',
    'setProperty',
    'setValue',
    'listen',
  ]);

  /* const rootRendererMock = {
    renderComponent: () => {
      return renderer2Mock;
    },
  }; */

  beforeEach(() => {
    const spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'getObject']);
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    // const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);

    TestBed.configureTestingModule({
      providers: [Renderer2,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
        // { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    drawingServiceSpy = TestBed.get(DrawingService);
    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    // colorToolServiceSpy = TestBed.get(ToolsColorService);
  });

  it('tool-rectangle service should be created', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    expect(service).toBeTruthy();
  });

  it('should set square with shift', () => {
    let obj: SVGElement = SVGElement.prototype;

    drawingServiceSpy.renderer = renderer2Mock;
    renderer2Mock.createElement.and.returnValue(() => {
      obj = document.createElement('rect') as Element as SVGElement;
      return obj;
    });
    drawingServiceSpy.addObject.and.callFake((object) => { obj = object as SVGRectElement; return 1; });

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });

    const mouseEvent = new MouseEvent('keydown', { button: 0 });

    service.onPressed(mouseEvent);
    console.log(obj.tagName);

    service.onKeyDown(eventKeyDown);

    expect(obj).toBeTruthy();
  });

  it('should unset square with unshift', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // expect(object.height).toEqual(object.width);

    // const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    // window.dispatchEvent(eventKeyUp);

    // expect(object.height).toEqual(40);
    // expect(object.width).toEqual(50);
  });

  it('should not unset square with one unshift of two shift', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // expect(object.height).toEqual(object.width);

    // const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: true });
    // window.dispatchEvent(eventKeyUp);

    // expect(object.height).toEqual(object.width);
  });

  it('should create un object on mouse press with good color', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    // colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    // colorToolServiceSpy.primaryAlpha = 0;
    // colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    // colorToolServiceSpy.secondaryAlpha = 1;

    // let object: RectangleObject | null = null;

    // object = service.onPressed(new MouseEvent('mousedown', { button: 0 })) as RectangleObject;

    // expect(object).not.toBeNull();
    // expect(object.primaryColor).toEqual({ rgb: { r: 0, g: 0, b: 0 }, a: 0 });
    // expect(object.secondaryColor).toEqual({ rgb: { r: 255, g: 255, b: 255 }, a: 1 });
  });

  it('should create un object on mouse press with switched color', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    // colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    // colorToolServiceSpy.primaryAlpha = 0;
    // colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    // colorToolServiceSpy.secondaryAlpha = 1;

    // let object: RectangleObject | null = null;

    // object = service.onPressed(new MouseEvent('mousedown', { button: 2 })) as RectangleObject;

    // expect(object).not.toBeNull();
    // expect(object.secondaryColor).toEqual({ rgb: { r: 0, g: 0, b: 0 }, a: 0 });
    // expect(object.primaryColor).toEqual({ rgb: { r: 255, g: 255, b: 255 }, a: 1 });
  });

  it('should set size of object on mouse move', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toEqual(40);
    // expect(object.width).toEqual(50);
  });

  it('should NOT set size of object on mouse move', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;
    // service.onRelease(new MouseEvent('mouseup'));

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.width).toBe(0);
    // expect(object.height).toBe(0);
  });

  it('should put width and height positive when they are negative', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 80 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toBeGreaterThan(0);
    // expect(object.width).toBeGreaterThan(0);
  });

  it('should put width and height equal and positive when they are negative on square mode', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 80 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 40 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toEqual(object.width);
    // expect(object.height).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive on square mode for Y smaller than first y', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 80 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 60, y: 0 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toEqual(object.width);
    // expect(object.height).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive on square mode for Y bigger than first y', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 80 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 60, y: 100 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toEqual(object.width);
    // expect(object.height).toBeGreaterThanOrEqual(0);
  });

  it('should put width and height equal and positive on square mode for X', () => {
    // const service: ToolRectangleService = TestBed.get(ToolRectangleService);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 50, y: 80 });
    // const object = service.onPressed(new MouseEvent('mousedown')) as RectangleObject;

    // const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    // window.dispatchEvent(eventKeyDown);

    // offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 100 });
    // service.onMove(new MouseEvent('mousemove'));

    // expect(object.height).toEqual(object.width);
    // expect(object.width).toBeGreaterThanOrEqual(0);
  });
});
