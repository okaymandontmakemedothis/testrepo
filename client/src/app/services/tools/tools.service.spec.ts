import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { EtampeToolService } from './etampe-tool/etampe-tool.service';
import { GridService } from './grid-tool/grid.sevice';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { PipetteToolService } from './pipette-tool/pipette-tool.service';
import { ToolEllipseService } from './tool-ellipse/tool-ellipse.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolsService } from './tools.service';

describe('ToolsListService', () => {
  // let pencilToolServiceSpy: jasmine.SpyObj<PencilToolService>;

  const tool: ITools = {
    id: 0, faIcon: faSquare, toolName: 'tool', parameters: FormGroup.prototype,
    onPressed() { return; }, onRelease() { return; }, onMove() { return; },
    onKeyDown() { return; }, onKeyUp() { return; },
  };

  beforeEach(() => {
    // const spyPencil = jasmine.createSpyObj('PencilToolService', ['onPressed']);

    TestBed.configureTestingModule({
      providers: [
        PencilToolService,
        BrushToolService,
        ToolsApplierColorsService,
        ToolRectangleService,
        ToolEllipseService,
        PipetteToolService,
        EtampeToolService,
        GridService,
      ],
    });

    // pencilToolServiceSpy = TestBed.get(PencilToolService);
  });

  it('should be created', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service).toBeTruthy();
  });

  it('tools should not be empty', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service.tools.size).toBeGreaterThan(0);
  });

  it('call on selectedTool', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service.selectedToolId).toEqual(0);
    service.selectTool(2);
    expect(service.selectedToolId).toEqual(2);
  });

  it('onPressed calls onPressed of the current tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onPressed').and.returnValue();

    service.selectTool(0);
    service.onPressed(mouseEvent);

    expect(tool.onPressed).toHaveBeenCalled();
  });

  it('onPressed does not call onPressed of the current tool because there is no tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onPressed').and.returnValue();

    service.selectTool(1);
    service.onPressed(mouseEvent);

    expect(tool.onPressed).not.toHaveBeenCalled();
  });

  it('onRelease calls onRelease of the current tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onRelease').and.returnValue();

    service.selectTool(0);
    service.onPressed(mouseEvent);
    service.onRelease(mouseEvent);

    expect(tool.onRelease).toHaveBeenCalled();
  });

  it('onRelease does not calls onRelease of the current tool because there is no tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onRelease').and.returnValue();

    service.selectTool(1);
    service.onPressed(mouseEvent);
    service.onRelease(mouseEvent);

    expect(tool.onRelease).not.toHaveBeenCalled();
  });

  it('onRelease does not calls onRelease of the current tool because there was no click', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onRelease').and.returnValue();

    service.selectTool(0);
    service.onRelease(mouseEvent);

    expect(tool.onRelease).not.toHaveBeenCalled();
  });

  it('onMove calls onMove of the current tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onMove').and.returnValue();

    service.selectTool(0);
    service.onPressed(mouseEvent);
    service.onMove(mouseEvent);

    expect(tool.onMove).toHaveBeenCalled();
  });

  it('onMove does not calls onMove of the current tool because there is no tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onMove').and.returnValue();

    service.selectTool(1);
    service.onPressed(mouseEvent);
    service.onMove(mouseEvent);

    expect(tool.onMove).not.toHaveBeenCalled();
  });

  it('onMove does not calls onMove of the current tool because there was no click', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const mouseEvent = new MouseEvent('mousedown');
    spyOn(tool, 'onMove').and.returnValue();

    service.selectTool(0);
    service.onMove(mouseEvent);

    expect(tool.onMove).not.toHaveBeenCalled();
  });

  it('onKeyTriggered calls onKeyDown of the current tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keydown');
    const mouseEvent = new MouseEvent('mousedown');

    spyOn(tool, 'onKeyDown').and.returnValue();

    service.selectTool(0);
    service.onPressed(mouseEvent);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyDown).toHaveBeenCalled();
  });

  it('onKeyTriggered does not calls onKeyDown of the current tool because there is no tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keydown');
    const mouseEvent = new MouseEvent('mousedown');

    spyOn(tool, 'onKeyDown').and.returnValue();

    service.selectTool(1);
    service.onPressed(mouseEvent);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyDown).not.toHaveBeenCalled();
  });

  it('onKeyTriggered does not calls onKeyDown of the current tool because there was no click', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keydown');

    spyOn(tool, 'onKeyDown').and.returnValue();

    service.selectTool(0);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyDown).not.toHaveBeenCalled();
  });

  it('onKeyTriggered calls onKeyUp of the current tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keyup');
    const mouseEvent = new MouseEvent('mousedown');

    spyOn(tool, 'onKeyUp').and.returnValue();

    service.selectTool(0);
    service.onPressed(mouseEvent);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyUp).toHaveBeenCalled();
  });

  it('onKeyTriggered does not calls onKeyUp of the current tool because there is no tool', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keyup');
    const mouseEvent = new MouseEvent('mousedown');

    spyOn(tool, 'onKeyUp').and.returnValue();

    service.selectTool(1);
    service.onPressed(mouseEvent);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyUp).not.toHaveBeenCalled();
  });

  it('onKeyTriggered does not calls onKeyUp of the current tool because there was no click', () => {
    const service: ToolsService = TestBed.get(ToolsService);

    service.tools.clear();
    service.tools.set(0, tool);

    const keyEvent = new KeyboardEvent('keyup');

    spyOn(tool, 'onKeyUp');

    service.selectTool(0);

    window.dispatchEvent(keyEvent);

    expect(tool.onKeyUp).not.toHaveBeenCalled();
  });
});
