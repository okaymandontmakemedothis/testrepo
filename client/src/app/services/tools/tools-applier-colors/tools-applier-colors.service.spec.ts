import { TestBed } from '@angular/core/testing';
import { ToolsApplierColorsService } from './tools-applier-colors.service';
import { DrawingService } from '../../drawing/drawing.service';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from 'src/app/model/rgba.model';
import { ToolsColorService } from '../../tools-color/tools-color.service';
class MockOject implements IObjects {
  id = 1;
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
  it('should be created', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    expect(service).toBeTruthy();
  });
  it('should get object from id', () => {
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
});
