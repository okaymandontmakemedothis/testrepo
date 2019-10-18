import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { DrawingService } from '../../drawing/drawing.service';
import { Renderer2 } from '@angular/core';
import { EtampeToolService } from './etampe-tool.service';

describe('PencilToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle',]);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
      ],
    });

    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    drawingServiceSpy = TestBed.get(DrawingService);
    drawingServiceSpy.addObject.and.returnValue(1);
  });

  it('etampe service should be created', () => {
      const service: EtampeToolService = TestBed.get(EtampeToolService);
      expect(service).toBeTruthy();
  });

  it('should create a stamp object on mouse press', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');
    service.onPressed(new MouseEvent('mousedown'));
    const fs: number = (service.parameters.get('facteurSize') as FormControl).value;
    const url: string = (service.parameters.get('etampe') as FormControl).value;
    const rotation = `rotate(${service.angleRotation},10,10)`;

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('image', 'svg');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'x', (10 - fs / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'y', (10 - fs / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'height', fs.toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'width', fs.toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'href', url);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('image', 'transform', rotation);

    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('image');
  });

  it('should not create a stamp object on right mouse press ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();

  });

  it('should not addObject if object does not exist ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue(null);

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();

  });

  it('should return null on release', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeUndefined();
  });

  it('should return null on move', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeUndefined();
  });

  it('should set cran to 1 with alt', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });

    service.onKeyDown(eventKeyDown);
    expect(service.intervaleDegresRotation).toEqual(1);
  });

  it('should set cran to 15 with altkey is false', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });
    service.onKeyDown(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(1);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: false });
    service.onKeyUp(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(15);
  });

  it('should set cran to 1 when to altkey is always true', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });
    service.onKeyDown(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(1);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: true });
    service.onKeyUp(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(1);
  });

  it('should set cran to 15 when to altkey is always false', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: false });
    service.onKeyDown(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(15);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: false });
    service.onKeyUp(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(15);
  });

  it('should call setAngleBackward and change the angle when mousewheel event gives a deltaY < 0', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventWheel = new WheelEvent('wheel', { deltaY: -10 });
    const spy = spyOn(service, 'setAngleBackward').and.callThrough();
    service.setAngle(eventWheel);

    expect(spy).toHaveBeenCalled();
    expect(service.angleRotation).toEqual(-15);
  });

  it('should call setAngleForward and change the angle when mousewheel event gives a deltaY > 0', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue('image');
    service.intervaleDegresRotation = 15;
    service.angleRotation = 0;

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventWheel = new WheelEvent('wheel', { deltaY: 10 });
    const spy = spyOn(service, 'setAngleForward').and.callThrough();
    service.setAngle(eventWheel);

    expect(spy).toHaveBeenCalled();
    expect(service.angleRotation).toEqual(15);
  });

  it('should not call setAngleForward and change the angle when mousewheel ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue(null);
    service.intervaleDegresRotation = 15;
    service.angleRotation = 0;

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventWheel = new WheelEvent('wheel', { deltaY: 10 });
    const spy = spyOn(service, 'setAngleForward').and.callThrough();
    service.setAngle(eventWheel);

    expect(spy).not.toHaveBeenCalled();
    expect(service.angleRotation).toEqual(0);
  });

  it('should not call setAngleBackward and change the angle when mousewheel ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('image', 'svg').and.returnValue(null);
    service.intervaleDegresRotation = 15;
    service.angleRotation = 0;

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const eventWheel = new WheelEvent('wheel', { deltaY: -10 });
    const spy = spyOn(service, 'setAngleBackward').and.callThrough();
    service.setAngle(eventWheel);

    expect(spy).not.toHaveBeenCalled();
    expect(service.angleRotation).toEqual(0);
  });
});
