import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DrawingService } from './drawing.service';
import { Renderer2 } from '@angular/core';

describe('DrawingService', () => {
  const rgbColor: RGB = DEFAULT_RGB_COLOR;
  const alpha = 1;
  let service: DrawingService;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle']);

    TestBed.configureTestingModule({
      providers: [{ provide: Renderer2, useValue: rendererSpy }],

    });
    service = TestBed.get(DrawingService);
    
    rendererSpy = TestBed.get(Renderer2);
    service.renderer=rendererSpy

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#rgbaColorString should return rgba color in string', () => {
    service.color = rgbColor;
    service.alpha = alpha;
    const rgbaString = 'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ',' + alpha + ')';
    expect(service.rgbaColorString).toBe(rgbaString);
  });

  it('#rgbColorString should return rgba color in string', () => {
    service.color = rgbColor;
    const rgbString = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')';
    expect(service.rgbColorString).toBe(rgbString);
  });

  it('#addObject should add new object with good id', () => {
    service.drawing = document.createElement('svg') as Element as SVGElement;
    const lastId = service.lastObjectId;
    const obj = SVGElement.prototype;
    const retId = service.addObject(obj);
    expect(retId).toBe(lastId + 1);
  });

  it('#getObjectList should return the objectList', () => {
    service.drawing = document.createElement('svg') as Element as SVGElement;
    const obj1 = SVGElement.prototype;
    const retId = service.addObject(obj1);
    const obj2 = service.getObjectList();
    expect(obj2.size).toEqual(1);
    expect(obj2.get(retId)).toEqual(obj1);
  });

  it('#removeObject should remove object when called', () => {
    service.drawing = document.createElement('svg') as Element as SVGElement;
    const obj = SVGElement.prototype;
    const retId = service.addObject(obj);
    let retObj = service.getObject(retId);
    expect(retObj).toEqual(obj);
    service.removeObject(retId);
    retObj = service.getObject(retId);
    expect(retObj).toBeUndefined();
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
    let called = false;
    service.drawingEmit.subscribe(() => { called = true; });
    service.newDrawing(140, 202, { rgb: { r: 20, g: 230, b: 100 }, a: 0.8 });
    expect(service.alpha).toBe(0.8);
    expect(service.color).toEqual({ r: 20, g: 230, b: 100 });
    expect(service.lastObjectId).toBe(0);
    expect(called).toBeTruthy();
  });
});
