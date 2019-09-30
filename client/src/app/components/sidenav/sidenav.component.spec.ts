import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from 'src/app/app.material-modules';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { OffsetManagerService } from 'src/app/services/offset-manager/offset-manager.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { ToolsColorService } from 'src/app/services/tools-color/tools-color.service';
import { BrushToolService } from 'src/app/services/tools/brush-tool/brush-tool.service';
import { PencilToolService } from 'src/app/services/tools/pencil-tool/pencil-tool.service';
import { ToolRectangleService } from 'src/app/services/tools/tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from 'src/app/services/tools/tools-applier-colors/tools-applier-colors.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { BrushToolParameterComponent } from 'src/app/tool-parameter/brush-tool-parameter/brush-tool-parameter.component';
import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { ControlMenuComponent } from '../control-menu/control-menu.component';
import { ParameterMenuComponent } from '../parameter-menu/parameter-menu.component';
import { ToolsColorComponent } from '../tools-color/tools-color.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavModule } from './sidenav.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  const toggleDrawerService: ToggleDrawerService = new ToggleDrawerService();
  const hotkeyOutil: HotkeysOutilService = new HotkeysOutilService();
  const hotkeya: HotkeysFichierService = new HotkeysFichierService();
  const hotkeyb: HotkeysSelectionService = new HotkeysSelectionService();
  const hotkeyc: HotkeysTravailService = new HotkeysTravailService();
  const drawing: DrawingService = new DrawingService();
  const workspaceService: WorkspaceService = new WorkspaceService();
  const offsetManager: OffsetManagerService = new OffsetManagerService(workspaceService);
  const colorTool: ToolsColorService = new ToolsColorService();
  const texturesService: TexturesService = new TexturesService();
  const pencilTool: PencilToolService = new PencilToolService(offsetManager, colorTool);
  const brushTool: BrushToolService = new BrushToolService(texturesService, offsetManager, colorTool);
  const colorApplicator: ToolsApplierColorsService =  new ToolsApplierColorsService(drawing, colorTool);
  const rectangleTool: ToolRectangleService = new ToolRectangleService(drawing, offsetManager, colorTool);
  const toolService: ToolsService = new ToolsService(drawing, pencilTool, brushTool, colorApplicator, rectangleTool);
  const sideNavService: SidenavService = new SidenavService(toggleDrawerService, toolService, hotkeyOutil, hotkeya, hotkeyb, hotkeyc );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent, ToolsColorComponent, ParameterMenuComponent, WorkspaceComponent, CanvasComponent,
        PencilToolParameterComponent, ControlMenuComponent, BrushToolParameterComponent ],
      imports: [
        MaterialModules, FontAwesomeModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
        SidenavModule, ],
      providers: [ { provide: SidenavService, useValue: sideNavService }, 
        { provide: ToolsService, useValue: toolService}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sidenav component', () => {
    expect(component).toBeTruthy();
  });

  it('should get tool id', () => {
    toolService.selectedToolId = 1;
    expect(component.currentToolId).toEqual(1);
  });

  it('should get tool list', () => {
    expect(component.toolList).toEqual(sideNavService.toolList);
  });

  it('should get isOpen', () => {
    toggleDrawerService.isOpened = true;
    expect(component.isOpened).toEqual(true);
  });

  it('should get selectedParameter', () => {
    expect(component.selectedParameter).toEqual(sideNavService.selectedParameter);
  });

  it('should open', () => {
    spyOn(sideNavService, 'open').and.callThrough();
    component.open();
    expect(sideNavService.open).toHaveBeenCalled();
  });

  it('should close', () => {
    spyOn(sideNavService, 'close').and.callThrough();
    component.close();
    expect(sideNavService.close).toHaveBeenCalled();
  });

  it('should openControlMenu', () => {
    spyOn(sideNavService, 'openControlMenu').and.callThrough();
    component.openControlMenu();
    expect(sideNavService.openControlMenu).toHaveBeenCalled();
  });

  /*it('should change the selection', () => {
    const selectedItem: MatButtonToggleChange = new MatButtonToggleChange(MatButtonToggle, 3);
    component.selectionChanged(selectedItem)
    expect(sideNavService.selectionChanged(selectedItem)).toHaveBeenCalled();
  });*/

});
