import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IObjects } from 'src/app/objects/IObjects';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { DrawingService } from '../drawing/drawing.service';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolsService } from './tools.service';

class MockItool implements ITools {
  readonly id: 5;
  readonly faIcon: IconDefinition;
  readonly toolName: 'brush';
  parameters: FormGroup;
  onPressed(event: MouseEvent): IObjects | null {
    if (event.button === 0) {
      return null;
    }
    return new RectangleObject(0, 0, 0, '');
  }
  onRelease(event: MouseEvent): void { }
  onMove(event: MouseEvent): void { }
}

describe('ToolsListService', () => {
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(() => {
    const drawingSpy = jasmine.createSpyObj('DrawingService', ['addObject', 'draw']);
    TestBed.configureTestingModule({
      providers: [PencilToolService, BrushToolService, ToolsApplierColorsService, ToolRectangleService,
        { provide: DrawingService, useValue: drawingSpy }],
    });
    drawingServiceSpy = TestBed.get(DrawingService);
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
    const tool = new MockItool();
    service.tools.push(tool);
    service.selectTool(service.tools.length - 1);
    expect(service.selectedTool).toBe(tool);
  });

  it('onPressed calls add object if object is not null', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    service.onPressed(mouseEvent);

    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    expect(service.currentObject).not.toBeNull();
  });

  it('onPressed does not call add object if object is null', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 0 });
    service.onPressed(mouseEvent);

    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(service.currentObject).toBeNull();
  });

  it('onRelease calls draw', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    service.onPressed(mouseEvent);
    expect(service.currentObject).not.toBeNull();

    service.onRelease(mouseEvent);
    expect(drawingServiceSpy.draw).toHaveBeenCalled();
    expect(service.currentObject).toBeNull();
  });

  it('onMove calls service.selectedTool on Move', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    service.onPressed(mouseEvent);
    expect(service.currentObject).not.toBeNull();

    spyOn(service.selectedTool, 'onMove').and.callThrough();
    service.onMove(mouseEvent);
    expect(service.selectedTool.onMove).toHaveBeenCalled();
  });

  it('onMove calls service.selectedTool on Move', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    expect(service.currentObject).toBeNull();

    spyOn(service.selectedTool, 'onMove').and.callThrough();
    service.onMove(mouseEvent);
    expect(service.selectedTool.onMove).not.toHaveBeenCalled();
  });

  it('onMove calls service.selectedTool on Move', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    service.tools.push(new MockItool());
    service.selectTool(service.tools.length - 1);

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    expect(service.currentObject).toBeNull();

    service.onRelease(mouseEvent);
    expect(drawingServiceSpy.draw).not.toHaveBeenCalled();
  });
});
