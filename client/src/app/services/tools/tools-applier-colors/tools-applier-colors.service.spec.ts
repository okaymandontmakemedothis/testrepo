import { TestBed } from '@angular/core/testing';

import { ToolsApplierColorsService } from './tools-applier-colors.service';
import { DrawingService } from '../../drawing/drawing.service';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from 'src/app/model/rgba.model';
import { ToolsColorService } from '../../tools-color/tools-color.service';

class MockOject implements IObjects{
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
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    expect(service).toBeTruthy();
  });

  it('should get object from id', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const eventMouseDown = new MouseEvent('click');
    const colorService: ToolsColorService = new ToolsColorService();
    const drawingService: DrawingService = new DrawingService();
    const obj: IObjects = new MockOject();
    obj.id = 1;
    spyOn(drawingService, 'getObject').and.returnValue(obj);
    spyOnProperty(colorService, 'primaryColor', 'get').and.returnValue({rgb: {r: 255, g: 0, b: 0}, a: 1});
    spyOnProperty(colorService, 'primaryAlpha', 'get').and.returnValue(1);
    service.onPressed(eventMouseDown);
    expect(obj.primaryColor).toBe({rgb: { r: 255, g: 0, b: 0 }, a: 1});

  });
});
