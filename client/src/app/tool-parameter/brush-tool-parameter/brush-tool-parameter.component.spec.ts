import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushToolParameterComponent } from './brush-tool-parameter.component';
import { BrushToolService } from 'src/app/services/tools/brush-tool/brush-tool.service';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { OffsetManagerService } from 'src/app/services/offset-manager/offset-manager.service';
import { ToolsColorService } from 'src/app/services/tools-color/tools-color.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';

describe('BrushToolParameterComponent', () => {
  let component: BrushToolParameterComponent;
  let fixture: ComponentFixture<BrushToolParameterComponent>;
  const textureService: TexturesService = new TexturesService(); 
  const workspaceService: WorkspaceService = new WorkspaceService();
  const offsetService: OffsetManagerService = new OffsetManagerService(workspaceService);
  const colorService: ToolsColorService = new ToolsColorService();
  const brushToolService: BrushToolService = new BrushToolService(textureService, offsetService, colorService);
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushToolParameterComponent ],
      providers: [{ provide: TexturesService, useValue: textureService }, { provide: WorkspaceService, useValue: workspaceService },
        { provide: OffsetManagerService, useValue: offsetService }, { provide: ToolsColorService, useValue: colorService },
        { provide: BrushToolService, useValue: brushToolService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create brush tool parameters', () => {
    expect(component).toBeTruthy();
  });

  it('should get tool name', () => {
    brushToolService.toolName = 'brush';
    expect(component.toolName).toEqual('brush');
  });

  it('should get list texture', () => {
    textureService.textureOptionList = [];
    expect(textureService.textureOptionList).toEqual(component.listTexture);
  });

  it('should get selected texture', () => {
    expect(component.form.get('texture')).toEqual(component.selectedTexture);
  });

  it('should get stroke width value', () => {
    expect(component.form.get('strokeWidth')).toEqual(component.strokeWidthValue);
  });
});
