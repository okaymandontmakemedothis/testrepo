import { TestBed } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';
import { ToolsService } from '../tools/tools.service';
import { ToolRectangleService } from '../tools/tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from '../tools/tools-applier-colors/tools-applier-colors.service';
import { PencilToolService } from '../tools/pencil-tool/pencil-tool.service';
import { BrushToolService } from '../tools/brush-tool/brush-tool.service';
import { TexturesService } from '../textures/textures.service';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { OffsetManagerService } from '../offset-manager/offset-manager.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { DrawingService } from '../drawing/drawing.service';
import { HotkeysTravailService } from '../hotkeys/hotkeys-travail/hotkeys-travail.service';
import { HotkeysSelectionService } from '../hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysFichierService } from '../hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from '../hotkeys/hotkeys-outil/hotkeys-outil.service';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from 'src/app/components/welcome-dialog/welcome-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule, } from '@angular/material';
//import { EventEmitter } from '@angular/core';

describe('SidenavService', () => {
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
  const colorApplicator: ToolsApplierColorsService = new ToolsApplierColorsService(drawing, colorTool);
  const rectangleTool: ToolRectangleService = new ToolRectangleService(drawing, offsetManager, colorTool);
  const toolService: ToolsService = new ToolsService(drawing, pencilTool, brushTool, colorApplicator, rectangleTool);
 
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule, BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule, MatButtonToggleModule],
    providers: [{ provide: ToggleDrawerService, useValue: toggleDrawerService },
      { provide: ToolsService, useValue: toolService }, { provide: HotkeysOutilService, useValue: hotkeyOutil },
      { provide: HotkeysFichierService, useValue: hotkeya }, { provide: HotkeysSelectionService, useValue: hotkeyb },
      { provide: HotkeysTravailService, useValue: hotkeyc }],
  }));

  it('sidenav service should be created', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    expect(service).toBeTruthy();
  });

  it('should get tool list', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    expect(service.toolList).toEqual(toolService.tools);
  });

  it('should get isOpened', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    toggleDrawerService.isOpened = true;
    expect(service.isOpened).toEqual(true);
  });

  it('should get tool list length when selectedParameter is called and isControlMenu is true', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = true;
    service.toolList.length = 4;
    expect(service.selectedParameter).toEqual(4);
  });

  it('should get tool list selected tools id when selectedParameter is called and isControlMenu is false', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = false;
    toolService.selectedToolId = 4;
    expect(service.selectedParameter).toEqual(4);
  });

  it('should open', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(toggleDrawerService, 'open').and.callThrough();
    service.open();
    expect(toggleDrawerService.open).toHaveBeenCalled();
  });

  it('should close', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(toggleDrawerService, 'close').and.callThrough();
    service.close();
    expect(toggleDrawerService.close).toHaveBeenCalled();
  });

  it('should openControlMenu', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(service, 'open').and.callThrough();
    service.openControlMenu();
    expect(service.open).toHaveBeenCalled();
    expect(service.isControlMenu).toEqual(true);
  });

  it('should call eventListenerOnInput and execute hotkeys if canClick is true', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const mouseEvent = new MouseEvent('mousedown');
    service.canClick = true;
    window.dispatchEvent(mouseEvent);
    expect(hotkeyOutil.canExecute).toEqual(true);
    expect(hotkeya.canExecute).toEqual(true);
    expect(hotkeyb.canExecute).toEqual(true);
    expect(hotkeyc.canExecute).toEqual(true);
  });

  /*it('should call eventListenerOnInput and not execute hotkeys if target is not undefined', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const mouseEvent = new MouseEvent('mousedown');
    spyOnProperty(mouseEvent, 'target').and.returnValue( as HTMLInputElement);
    mouseEvent.target: HTMLInputElement
    window.dispatchEvent(mouseEvent);
    expect(hotkeyOutil.canExecute).toEqual(false);
    expect(hotkeya.canExecute).toEqual(false);
    expect(hotkeyb.canExecute).toEqual(false);
    expect(hotkeyc.canExecute).toEqual(false);
  });*/
});
