import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from 'src/app/components/new-drawing/new-drawing.component';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ToolIdConstants } from '../tools/tool-id-constants';
import { ToolsService } from '../tools/tools.service';
import { EmitReturn } from './hotkeys-constants';
import { HotkeysFichierService } from './hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from './hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from './hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from './hotkeys-travail/hotkeys-travail.service';

@Injectable({
  providedIn: 'root',
})
export class HotkeysService {

  constructor(
    private dialog: MatDialog,
    private toggleDrawerService: ToggleDrawerService,
    private toolsService: ToolsService,

    private hotkeysFichierService: HotkeysFichierService,
    private hotkeysOutilService: HotkeysOutilService,
    private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysTravailService: HotkeysTravailService,
  ) {
    this.subscribeToHotkeys();
    this.dialog.afterAllClosed.subscribe(() => {
      this.enableHotkeys();
    });
  }

  hotkeysListener() {
    window.addEventListener('keydown', (event) => {
      this.hotkeysFichierService.hotkeysFichier(event);
      this.hotkeysOutilService.hotkeysOutil(event);
      this.hotkeysSelectionService.hotkeysSelection(event);
      this.hotkeysTravailService.hotkeysTravail(event);
    });
  }

  /// Subscribe au hotkeys pour effectuer l'action associé
  private subscribeToHotkeys(): void {
    this.hotkeysFichierService.hotkeysFichierEmitter.subscribe((value: string) => {
      if (value === EmitReturn.NEW_DRAWING) {
        this.disableHotkeys();
        this.dialog.open(NewDrawingComponent);
      }
    });
    this.hotkeysOutilService.hotkeysOutilEmitter.subscribe((value: string) => {
      if (value === EmitReturn.PENCIL) {
        this.toggleDrawerService.open();
        this.toolsService.selectTool(ToolIdConstants.PENCIL_ID);
      }
      if (value === EmitReturn.BRUSH) {
        this.toggleDrawerService.open();
        this.toolsService.selectTool(ToolIdConstants.BRUSH_ID);
      }
      if (value === EmitReturn.APPLICATEUR) {
        this.toggleDrawerService.open();
        this.toolsService.selectTool(ToolIdConstants.APPLIER_ID);
      }
      if (value === EmitReturn.RECTANGLE) {
        this.toggleDrawerService.open();
        this.toolsService.selectTool(ToolIdConstants.RECTANGLE_ID);
      }
    });
  }

  /// Met les canExecutes des hotkeys a false
  disableHotkeys() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;
  }

  /// Met les canExecutes des hotkeys a true
  enableHotkeys() {
    this.hotkeysFichierService.canExecute = true;
    this.hotkeysSelectionService.canExecute = true;
    this.hotkeysOutilService.canExecute = true;
    this.hotkeysTravailService.canExecute = true;
  }
}
