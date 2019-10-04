import { TestBed } from '@angular/core/testing';
import { RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ToolsApplierColorsService } from './tools-applier-colors.service';

class MockOject implements IObjects {
  id: number;
  x: number;
  y: number;
  height: number;
  width: number;
  primaryColor: RGBA;
  secondaryColor: RGBA;
  draw(): string {
    return '';
  }
}
describe('ToolsApplierColorsService', () => {
  const colorService: ToolsColorService = new ToolsColorService();
  const drawingService: DrawingService = new DrawingService();
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: DrawingService, useValue: drawingService }, { provide: ToolsColorService, useValue: colorService }],
  }));
  it('applier service should be created', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    expect(service).toBeTruthy();
  });

  it('should change the primary color of the object on left click', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.primaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(obj);
    colorService.primaryColor = { r: 255, g: 0, b: 0 };
    colorService.primaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(obj.primaryColor).toEqual({ rgb: { r: 255, g: 0, b: 0 }, a: 0.5 });
  });

  it('should change the secondary color of the object on right click', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 2 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.secondaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(obj);
    colorService.secondaryColor = { r: 255, g: 0, b: 0 };
    colorService.secondaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(obj.secondaryColor).toEqual({ rgb: { r: 255, g: 0, b: 0 }, a: 0.5 });
  });

  it('should not change the primary color of the object on left click if not object is clicked', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.primaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(undefined);
    colorService.primaryColor = { r: 255, g: 0, b: 0 };
    colorService.primaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(obj.primaryColor).toEqual({ rgb: { r: 255, g: 2, b: 2 }, a: 1 });
  });

  it('should not change the secondary color of the object on right click if not object is clicked', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 2 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.secondaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(undefined);
    colorService.secondaryColor = { r: 255, g: 0, b: 0 };
    colorService.secondaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(obj.secondaryColor).toEqual({ rgb: { r: 255, g: 2, b: 2 }, a: 1 });
  });

  it('should return null on release', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeNull();
  });

  it('should return null on move', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeNull();
  });
});
