import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ToolRectangleService } from './tool-rectangle.service';

describe('ToolRectangleService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      providers: [Renderer2,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    drawingServiceSpy = TestBed.get(DrawingService);
    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy.addObject.and.returnValue(1);

    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;
  });

  it('tool-rectangle service should be created', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    expect(service).toBeTruthy();
  });

  it('should set square with shift', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyDown(eventKeyDown);

    expect(setSizeSpy).toHaveBeenCalledWith(10, 12);
  });

  it('should not set square if shiftKey is false on keydown', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: false });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyDown(eventKeyDown);

    expect(setSizeSpy).not.toHaveBeenCalledWith(10, 12);
  });

  it('should unset square with unshift', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const eventKeyUp = new KeyboardEvent('keyUp', { shiftKey: false });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyUp(eventKeyUp);

    expect(setSizeSpy).toHaveBeenCalledWith(10, 12);
  });

  it('should not unset square if shiftKey is true on keyUp', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: true });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyUp(eventKeyUp);

    expect(setSizeSpy).not.toHaveBeenCalledWith(10, 12);
  });

  it('should create un object on mouse press ', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });

    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('rect', 'svg');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '10');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '10');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke-width', sw.toString());
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('rect');

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);

  });

  it('should create an object with good color on both click when rectStyle is center', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('rectStyle') as FormControl).patchValue('center');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fill',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fill',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fillOpacity', colorToolServiceSpy.secondaryAlpha.toString());
  });

  it('should create an object with good color on both click when rectStyle is border', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('rectStyle') as FormControl).patchValue('border');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'strokeOpacity', colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should create an object with good color on both click when rectStyle is fill', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('rectStyle') as FormControl).patchValue('fill');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fill',
      `rgb(${colorToolServiceSpy.primaryColor.r},${ colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${ colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fill',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${ colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'fillOpacity', colorToolServiceSpy.secondaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke',
      `rgb(${colorToolServiceSpy.primaryColor.r},${ colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'strokeOpacity', colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should be undefined if case id default', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('rectStyle') as FormControl).patchValue('');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    expect(service.onPressed(new MouseEvent('mousedown', { button: 0 }))).toBeUndefined();
  });

  it('should do nothing if mouse button is not left or right', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });

  it('should not call add object if object is undefined', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onPressed(new MouseEvent('mousedown', {button: 0}));
    service.onRelease(new MouseEvent('mouseup'));
    drawingServiceSpy.addObject.calls.reset();

    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(setSizeSpy).not.toHaveBeenCalled();

  });

  it('should set size of object on mouse move', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('rect');
    expect(setSizeSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should set correct size of object on mouse move if width < 0 and height <0', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 5, y: 5 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 0;
    service.oldY = 0;
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    service.onKeyUp(eventKeyUp);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '5.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '5.5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '0.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '0.5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'width', '4');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'height', '4');
  });

  it('should set correct size of object on mouse move if width > 0 and height > 0', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 10;
    service.oldY = 10;
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    service.onKeyUp(eventKeyUp);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '0.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '0.5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'width', '9');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'height', '9');
  });

  it('should change y when mouseX and MouseY < x and y and width < height on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 0;
    service.oldY = 2;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '4.5');
  });

  it('should change y when mouseX and MouseY < x and y and width > height on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 2;
    service.oldY = 0;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '4.5');
  });

  it('should change y width < height and when MouseY < y on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 2 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 4;
    service.oldY = 0;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '2.5');
  });

  it('should not change y width < height and when MouseY > y on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 2 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 4;
    service.oldY = 3;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '4.5');
  });

  it('should change x width > height and when Mousex < x on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.oldX = 1;
    service.oldY = 4;
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '2.5');
  });

  it('should not change x width > height and when Mousex > x on square mode', () => {
    const service: ToolRectangleService = TestBed.get(ToolRectangleService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.oldX = 3;
    service.oldY = 4;
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '4.5');
  });
});
