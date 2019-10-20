import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from 'src/app/components/new-drawing/new-drawing.component';
import { OpenDrawingComponent } from 'src/app/components/open-drawing/open-drawing.component';
import { SaveDrawingComponent } from 'src/app/components/save-drawing/save-drawing.component';
import { SidenavService } from '../sidenav/sidenav.service';
import { GridService } from '../tools/grid-tool/grid.service';
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
    private sideNavService: SidenavService,
    private toolsService: ToolsService,
    private gridService: GridService,

    private hotkeysFichierService: HotkeysFichierService,
    private hotkeysOutilService: HotkeysOutilService,
    private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysTravailService: HotkeysTravailService,
  ) {
    this.eventListenerOnInput();
    this.subscribeToHotkeys();

    this.dialog.afterOpened.subscribe(() => {
      this.disableHotkeys();
      this.canClick = false;
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.enableHotkeys();
      this.canClick = true;
    });
  }

  private canClick = false;

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
        this.dialog.open(NewDrawingComponent, {});
      } else if (value === EmitReturn.SAVE_DRAWING) {
        this.dialog.open(SaveDrawingComponent, {});
      } else if (value === EmitReturn.OPEN_DRAWING) {
        this.dialog.open(OpenDrawingComponent, {});
      }
    });

    this.hotkeysOutilService.hotkeysOutilEmitter.subscribe((value: string) => {
      if (value === EmitReturn.PENCIL) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.PENCIL_ID);
      } else if (value === EmitReturn.BRUSH) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.BRUSH_ID);
      } else if (value === EmitReturn.APPLICATEUR) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.APPLIER_ID);
      } else if (value === EmitReturn.RECTANGLE) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.RECTANGLE_ID);
      } else if (value === EmitReturn.ELLIPSE) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.ELLIPSE_ID);
      } else if (value === EmitReturn.LINE) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.LINE_ID);
      } else if (value === EmitReturn.PIPETTE) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.PIPETTE_ID);
      } else if (value === EmitReturn.SELECTION) {
        this.sideNavService.open();
        this.sideNavService.isControlMenu = false;
        this.toolsService.selectTool(ToolIdConstants.SELECTION_ID);
      }
    });

    this.hotkeysTravailService.hotkeysTravailEmitter.subscribe((value: string) => {
      if (value === EmitReturn.ENABLE_GRID) {
        this.gridService.showGrid();
      } else if (value === EmitReturn.DISABLE_GRID) {
        this.gridService.hideGrid();
      } else if (value === EmitReturn.ADD5_GRID) {
        const size = this.gridService.sizeCell.value;
        this.gridService.sizeCell.setValue(size - size % 5 + 5);
        this.gridService.changeGridSize();
      } else if (value === EmitReturn.SUB5_GRID) {
        const size = this.gridService.sizeCell.value;
        this.gridService.sizeCell.setValue(size % 5 ? size + (5 - size % 5) - 5 : size - 5);
        this.gridService.changeGridSize();
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

  /// Verifie si on doit appeller les hotkeys
  private eventListenerOnInput() {
    window.addEventListener('mousedown', (event) => {
      if ((event.target as HTMLInputElement).value !== undefined) {
        this.disableHotkeys();
      } else if (this.canClick) {
        this.enableHotkeys();
      }
    });
  }
}
