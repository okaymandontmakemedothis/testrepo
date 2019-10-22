import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ToolEllipseService } from './tool-ellipse.service';

describe('ToolEllipseService', () => {
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

  it('tool-ellipse service should be created', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    expect(service).toBeTruthy();
  });

  it('should set circle with shift', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyDown(eventKeyDown);

    expect(setSizeSpy).toHaveBeenCalledWith(10, 12);
  });

  it('should not set circle if shiftKey is false on keydown', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: false });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyDown(eventKeyDown);

    expect(setSizeSpy).not.toHaveBeenCalledWith(10, 12);
  });

  it('should unset circle with unshift', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const eventKeyUp = new KeyboardEvent('keyUp', { shiftKey: false });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyUp(eventKeyUp);

    expect(setSizeSpy).toHaveBeenCalledWith(10, 12);
  });

  it('should not unset circle if shiftKey is true on keyUp', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: true });
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onMove(moveEvent);
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onKeyUp(eventKeyUp);

    expect(setSizeSpy).not.toHaveBeenCalledWith(10, 12);
  });

  it('should create un object on mouse press ', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });

    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('rect', 'svg');
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('rect');

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('ellipse', 'svg');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '10');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '10');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke-width', sw.toString());
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('ellipse');

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
  });

  it('should not addObject if contour doesnt exist ', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('rect');

  });

  it('should create an object with good color on both click when ellipseStyle is center', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('ellipseStyle') as FormControl).patchValue('center');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fill',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fill',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fillOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());
  });

  it('should create an object with good color on both click when ellipseStyle is border', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('ellipseStyle') as FormControl).patchValue('border');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'strokeOpacity',
      colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should create an object with good color on both click when ellipseStyle is fill', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('ellipseStyle') as FormControl).patchValue('fill');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fill',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fill',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'fillOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'strokeOpacity',
      colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should be undefined if case id default', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('ellipseStyle') as FormControl).patchValue('');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    expect(service.onPressed(new MouseEvent('mousedown', { button: 0 }))).toBeUndefined();
  });

  it('should do nothing if mouse button is not left or right', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });

  it('should not call add object if object is undefined onMove', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    spyOn(service as any, 'setSize');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));
    drawingServiceSpy.addObject.calls.reset();

    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
  });

  it('should call remove object if object exist onRelease', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));
    expect(drawingServiceSpy.removeObject).toHaveBeenCalled();

  });

  it('should not call remove object if object is undefined onRelease', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));

    expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
  });

  it('should set size of object on mouse move', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('ellipse');
    expect(setSizeSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should set correct size of object on mouse move if width < 0 and height <0', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 5, y: 5 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 0;
    service.oldY = 0;
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    service.onKeyUp(eventKeyUp);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '2.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '2.5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '2.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '0');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '2.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '0');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'rx', '2');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'ry', '2');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'width', '5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'height', '5');
  });

  it('should set correct size of object on mouse move if width > 0 and height > 0', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 10;
    service.oldY = 10;
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    service.onKeyUp(eventKeyUp);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '0');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '0');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'rx', '4.5');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'ry', '4.5');

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'width', '10');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'height', '10');
  });

  it('should change y and cy when mouseX and MouseY < x and y and width > height on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 0;
    service.oldY = 2;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '3');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '2');
  });

  it('should change x and cx when mouseX and MouseY < x and y and width > height on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 2;
    service.oldY = 0;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '3');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '2');
  });

  it('should change y and cy width < height and when MouseY < y on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 2 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 4;
    service.oldY = 0;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '2');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'y', '2');
  });

  it('should change cy when width < height and when MouseY > y on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 4, y: 2 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 4;
    service.oldY = 3;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '2');
  });

  it('should change x and cx when width > height and when Mousex < x on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 1;
    service.oldY = 4;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '2');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'x', '2');
  });

  it('should change cx when width > height and when Mousex > x on circle mode', () => {
    const service: ToolEllipseService = TestBed.get(ToolEllipseService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 4 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.oldX = 3;
    service.oldY = 4;
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true });
    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '2');
  });

});
