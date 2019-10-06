import { TestBed } from '@angular/core/testing';
import { Polyline } from 'src/app/objects/object-polyline/polyline';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { BrushToolService } from './brush-tool.service';
import { FormControl } from '@angular/forms';

describe('BrushToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);

    TestBed.configureTestingModule({
      providers: [
        { provide: OffsetManagerService, useValue: spyOffset },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
  });

  it('brush service should be created', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service).toBeTruthy();
  });

  it('should add point to the current polyline', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT be able add point to the current polyline', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.onRelease(new MouseEvent('mousedown'));

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should create an object with switched color on right click', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;

    const object = service.onPressed(new MouseEvent('mousedown', { button: 2 })) as Polyline;

    expect(object.secondaryColor).toEqual({ rgb: { r: 0, g: 0, b: 0 }, a: 0 });
    expect(object.primaryColor).toEqual({ rgb: { r: 255, g: 255, b: 255 }, a: 1 });
  });

  it('should create an object with good color on left click', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });

    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;

    const object = service.onPressed(new MouseEvent('mousedown', { button: 0 })) as Polyline;

    expect(object.primaryColor).toEqual({ rgb: { r: 0, g: 0, b: 0 }, a: 0 });
    expect(object.secondaryColor).toEqual({ rgb: { r: 255, g: 255, b: 255 }, a: 1 });
  });

  it('should return null if strokewidth is equal to 0', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(0);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeNull();
  });
});
