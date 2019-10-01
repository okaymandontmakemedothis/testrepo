import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ITools } from './ITools';
import { ToolsService } from './tools.service';


class MockItool implements ITools{
  readonly id: 5;
  readonly faIcon: IconDefinition;
  readonly toolName: 'brush';
  parameters: FormGroup;
  onPressed(event: MouseEvent): IObjects | null{
    return null;
  }
  onRelease(event: MouseEvent): void {}
  onMove(event: MouseEvent): void {}
}
describe('ToolsListService', () => {
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(() => {
    const drawingSpy = jasmine.createSpyObj('DrawingService', ['']);
    TestBed.configureTestingModule({
      providers: [
        { provide: DrawingService, useValue: drawingSpy }],
      });
    drawingServiceSpy = TestBed.get(drawingServiceSpy);
    });

  it('should be created', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service).toBeTruthy();
  });

  it('tools should not be empty', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service.tools.length).not.toEqual(0);
  });

  it('call on selectedTool', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    const tool: ITools = new MockItool();
    service.selectedToolId = 5;
    const spy = spyOnProperty(service, 'selectedTool').and.returnValue(tool);
    expect(service.tools[service.selectedToolId]).toEqual(spy);
  });

  it('onPressed calls add object if object is not null', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    const mouseEvent = new MouseEvent('mousedown');
    service.onPressed(mouseEvent);
    spyOn(drawingServiceSpy, 'addObject').and.callThrough();
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    expect(service.currentObject).not.toBeNull();
  });

  it('onPressed does not call add object if object is null', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown');
    service.onPressed(mouseEvent);

    spyOn(drawingServiceSpy, 'addObject').and.callThrough();
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(service.currentObject).toBeNull();
  });

  it('onRelease calls draw', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    const mouseEvent = new MouseEvent('mousedown');
    service.onPressed(mouseEvent);
    expect(service.currentObject).not.toBeNull();

    service.onRelease(mouseEvent);
    spyOn(drawingServiceSpy, 'draw').and.callThrough();
    expect(drawingServiceSpy.draw).toHaveBeenCalled();
    expect(service.currentObject).toBeNull();
  });

  it('onMove calls service.selectedTool on Move', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    const mouseEvent = new MouseEvent('mousedown');
    service.onPressed(mouseEvent);
    expect(service.currentObject).not.toBeNull();

    service.onMove(mouseEvent);
    spyOn(service.selectedTool, 'onMove').and.callThrough();
    expect(service.selectedTool.onMove).toHaveBeenCalled();
  });

});
