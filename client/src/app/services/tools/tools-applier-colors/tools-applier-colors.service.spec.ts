import { TestBed } from '@angular/core/testing';

import { ToolsApplierColorsService } from './tools-applier-colors.service';
import { DrawingService } from '../../drawing/drawing.service';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from 'src/app/model/rgba.model';

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
    const mockDrawingService: DrawingService = new DrawingService();
    const obj: IObjects = ;
    const eventMouseDown = new MouseEvent('click');
    const object = mockDrawingService.getObject(obj.id);
    expect(obj).toEqual(object);
  });

  it('should change primary color of object on left mouse press', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const eventMouseDown = new MouseEvent('click');
    if()
    service.onPressed(eventMouseDown);

  });
});
