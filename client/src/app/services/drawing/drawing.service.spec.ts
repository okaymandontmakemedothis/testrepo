import { TestBed } from '@angular/core/testing';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from './drawing.service';
import { DEFAULT_ALPHA } from 'src/app/model/rgba.model';

class MockObject implements IObjects {
  id: number;
  x = 10;
  y = 20;
  height = 40;
  width = 60;
  primaryColor: import('../../model/rgba.model').RGBA = { rgb: DEFAULT_RGB_COLOR, a: DEFAULT_ALPHA };
  secondaryColor: import('../../model/rgba.model').RGBA = { rgb: { r: 0, g: 0, b: 0 }, a: DEFAULT_ALPHA };
  draw(): string {
    return 'test';
  }
}

describe('DrawingService', () => {
  const rgbColor: RGB = DEFAULT_RGB_COLOR;
  const alpha = 1;
  let service: DrawingService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#rgbaColorString should return rgba color in string', () => {
    service.color = rgbColor;
    service.alpha = alpha;
    const rgbaString = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',' + alpha + ')';
    expect(service.rgbaColorString).toBe(rgbaString);
  });

  it('#rgbColorString should return rgba color in string', () => {
    service.color = rgbColor;
    const rgbString = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')';
    expect(service.rgbColorString).toBe(rgbString);
  });

  it('#addObject should add new object with good id', () => {
    const lastId = service.lastObjectId;
    const obj = new MockObject();
    const spy = spyOn(service, 'draw').and.callThrough();
    service.addObject(obj);
    expect(spy).toHaveBeenCalled();
    expect(service.lastObjectId).toBe(lastId + 1);
  });

  it('#getObject should return the object', () => {
    const obj1: IObjects = new MockObject();
    service.addObject(obj1);
    const obj2: IObjects | undefined = service.getObject(service.lastObjectId);
    if (obj2) {
      expect(obj1).toEqual(obj2);
    } else {
      fail();
    }
  });

  it('should emit when draw is called', () => {
    let svgString = '';
    const obj1: IObjects = new MockObject();
    service.addObject(obj1);
    service.svgString.subscribe((value: string) => {
      svgString = value;
    });
    service.draw();
    expect(svgString).toBe('test');
  });

  it('#removeObject should remove object when called', () => {
    const obj1: IObjects = new MockObject();
    service.addObject(obj1);
    expect(service.lastObjectId).toBe(obj1.id);
    service.removeObject(obj1.id);
    expect(service.getObject(obj1.id)).toBeUndefined();
  });

  it('#setDimension should set dimension', () => {
    service.setDimension(10, 20);
    expect(service.width).toBe(10);
    expect(service.height).toBe(20);
  });

  it('#setDrawingColor should set drawingColoer', () => {
    service.setDrawingColor({ rgb: { r: 20, g: 230, b: 100 }, a: 0.8 });
    expect(service.alpha).toBe(0.8);
    expect(service.color).toEqual({ r: 20, g: 230, b: 100 });
  });

  it('#newDrawing should reset the drawing for a new drawing', () => {
    const spy = spyOn(service, 'draw').and.callThrough();
    service.newDrawing(140, 202, { rgb: { r: 20, g: 230, b: 100 }, a: 0.8 });
    expect(service.alpha).toBe(0.8);
    expect(service.color).toEqual({ r: 20, g: 230, b: 100 });
    expect(service.lastObjectId).toBe(0);
    expect(spy).toHaveBeenCalled();

  });
});
