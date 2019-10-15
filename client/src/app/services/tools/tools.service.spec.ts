import { TestBed } from '@angular/core/testing';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolsService } from './tools.service';

describe('ToolsListService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PencilToolService, BrushToolService, ToolsApplierColorsService, ToolRectangleService],
    });
  });

  it('should be created', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service).toBeTruthy();
  });

  it('tools should not be empty', () => {
  });

  it('call on selectedTool', () => {
  });

  it('onPressed calls add object if object is not null', () => {
  });

  it('onPressed does not call add object if object is null', () => {
  });

  it('onRelease calls draw', () => {
  });

  it('onMove calls service.selectedTool on Move', () => {
  });

  it('onMove calls service.selectedTool on Move', () => {
  });

  it('onMove calls service.selectedTool on Move', () => {
  });
});
