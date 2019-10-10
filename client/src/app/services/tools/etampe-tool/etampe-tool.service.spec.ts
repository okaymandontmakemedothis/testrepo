import { TestBed } from '@angular/core/testing';
import { EtampeObject } from 'src/app/objects/object-etampe/etampe';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { EtampeToolService } from './etampe-tool.service';

describe('EtampeToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    TestBed.configureTestingModule({
      providers: [
        { provide: OffsetManagerService, useValue: spyOffset } ],
  });
    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);

});

  it('etampe service should be created', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    expect(service).toBeTruthy();
  });

  it('should create a stamp object on mouse press', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 0 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    expect(object).not.toBeNull();
  });

  it('should not create a stamp object on right mouse press ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 1 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    expect(object).toBeNull();
  });

  it('should return null on release', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeNull();
  });

  it('should return null on move', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeNull();
  });

  it('should set cran to 1 with alt', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });

    window.dispatchEvent(eventKeyDown);
    expect(service.intervaleDegresRotation).toEqual(1);
  });

  it('should set cran to 15 with altkey is false', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });
    window.dispatchEvent(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(1);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: false });
    window.dispatchEvent(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(15);
  });

  it('should set cran to 1 when to altkey is always true', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: true });
    window.dispatchEvent(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(1);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: true });
    window.dispatchEvent(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(1);
  });

  it('should set cran to 15 when to altkey is always false', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventKeyDown = new KeyboardEvent('keydown', { altKey: false });
    window.dispatchEvent(eventKeyDown);

    expect(service.intervaleDegresRotation).toEqual(15);

    const eventKeyUp = new KeyboardEvent('keyup', { altKey: false });
    window.dispatchEvent(eventKeyUp);

    expect(service.intervaleDegresRotation).toEqual(15);
  });

  it('should call setAngleBackward when mousewheel event gives a deltaY < 0', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventWheel = new WheelEvent('wheel', {deltaY: -10});
    const spy = spyOn(service, 'setAngleBackward').and.callThrough();
    window.dispatchEvent(eventWheel);

    expect(spy).toHaveBeenCalled();
  });

  it('should call setAngle when mousewheel event gives a deltaY > 0', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const eventWheel = new WheelEvent('wheel', { deltaY: 10 });
    const spy = spyOn(service, 'setAngle').and.callThrough();
    window.dispatchEvent(eventWheel);

    expect(spy).toHaveBeenCalled();
  });

  it('should change angle when setAngle is called', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 0 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    service.intervaleDegresRotation = 15;
    object.angle = 0;
    service.setAngle();

    expect(object.angle).toEqual(15);
  });

  it('should change angle when setAngleBackward is called', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 0 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    service.intervaleDegresRotation = 15;
    object.angle = 0;
    service.setAngleBackward();

    expect(object.angle).toEqual(-15);
  });

});
