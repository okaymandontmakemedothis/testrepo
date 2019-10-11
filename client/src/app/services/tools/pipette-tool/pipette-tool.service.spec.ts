import { TestBed } from '@angular/core/testing';
import { RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../../drawing/drawing.service';
import { TexturesService } from '../../textures/textures.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { PipetteToolService } from './pipette-tool.service';

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
  toDrawingObject(): import('../../../../../../common/communication/drawing').DrawingObject {
    throw new Error('Method not implemented.');
  }
}
describe('PipetteToolService', () => {
  // TODO use mocks to replace dependencies
  const colorService: ToolsColorService = new ToolsColorService();
  const textureService: TexturesService = new TexturesService();
  const drawingService: DrawingService = new DrawingService(textureService);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: DrawingService, useValue: drawingService }, { provide: ToolsColorService, useValue: colorService }],
  }));
  it('pipette service should be created', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    expect(service).toBeTruthy();
  });

  it('should set the primary color of the object on left click', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.primaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(obj);
    service.onPressed(mouseEvent);
    expect(colorService.primaryColor).toEqual({ r: 255, g: 2, b: 2 });
    expect(colorService.primaryAlpha).toEqual(1);
  });

  it('should set the secondary color of the object on right click', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('click', { button: 2 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.primaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(obj);
    service.onPressed(mouseEvent);
    expect(colorService.secondaryColor).toEqual({ r: 255, g: 2, b: 2 });
    expect(colorService.secondaryAlpha).toEqual(1);
  });

  it('should not set the primary color of the object on left click if no object is clicked', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.primaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(undefined);
    colorService.primaryColor = { r: 255, g: 0, b: 0 };
    colorService.primaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(colorService.primaryColor).toEqual({ r: 255, g: 0, b: 0 });
    expect(colorService.primaryAlpha).toEqual(0.5);
  });

  it('should not set the secondary color of the object on left click if no object is clicked', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOnProperty(mouseEvent, 'target').and.returnValue(1);
    const obj: IObjects = new MockOject();
    obj.id = 1;
    obj.secondaryColor = { rgb: { r: 255, g: 2, b: 2 }, a: 1 };
    spyOn(drawingService, 'getObject').and.returnValue(undefined);
    colorService.secondaryColor = { r: 255, g: 0, b: 0 };
    colorService.secondaryAlpha = 0.5;
    service.onPressed(mouseEvent);
    expect(colorService.secondaryColor).toEqual({ r: 255, g: 0, b: 0 });
    expect(colorService.secondaryAlpha).toEqual(0.5);
  });

  it('should return null on release', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeNull();
  });

  it('should return null on move', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeNull();
  });

});
