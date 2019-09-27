import { Component, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { MatDialog } from '@angular/material';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToolIdConstants } from 'src/app/services/tools/toolIdConstants';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef, private workspaceService: WorkspaceService, private sidenavComponent: SidenavComponent,
    private toolsService: ToolsService, private dialog: MatDialog, private hotkeysFichierService: HotkeysFichierService, private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysOutilService: HotkeysOutilService, private hotkeysTravailService: HotkeysTravailService) {

    this.dialog.afterAllClosed.subscribe(() => {
      this.hotkeysFichierService.canExecute = true;
      this.hotkeysSelectionService.canExecute = true;
      this.hotkeysOutilService.canExecute = true;
      this.hotkeysTravailService.canExecute = true;
    });

    this.hotkeysFichierService.hotkeysFichierEmitter.subscribe((value: string) => {
      if (value == 'newDrawing')
        this.openDialog();
    });

    this.hotkeysOutilService.hotkeysOutilEmitter.subscribe((value: string) => {
      if (value == 'crayon') {
        this.sidenavComponent.selectedTool = ToolIdConstants.CRAYON_ID;
        this.toolsService.selectTool(ToolIdConstants.CRAYON_ID);
      }
      if (value == 'brush') {
        this.sidenavComponent.selectedTool = ToolIdConstants.BRUSH_ID;
        this.toolsService.selectTool(ToolIdConstants.BRUSH_ID);
      }
      if (value == 'applicateur') {
        this.sidenavComponent.selectedTool = ToolIdConstants.APPLICATEUR_ID;
        this.toolsService.selectTool(ToolIdConstants.APPLICATEUR_ID);
      }
      if (value == 'rectangle') {
        this.sidenavComponent.selectedTool = ToolIdConstants.RECTANGLE_ID;
        this.toolsService.selectTool(ToolIdConstants.RECTANGLE_ID);
      }
    });

  }

  ngOnInit() {
    this.workspaceService.el = this.el;

  }

  ngAfterViewInit(): void {
    this.openDialog();
  }

  openDialog() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;

    this.dialog.open(NewDrawingComponent, {
    });
  }


  onMouseDown(event: MouseEvent) {
    this.toolsService.onPressed(event);
  }

  onMouseUp(event: MouseEvent) {
    this.toolsService.onRelease(event);
  }

  onMouseMove(event: MouseEvent) {
    this.toolsService.onMove(event);
  }


  @HostListener("window:keydown", ["$event"])
  listenHotkey(event: KeyboardEvent) {
    this.hotkeysFichierService.hotkeysFichier(event);
    this.hotkeysSelectionService.hotkeysSelection(event);
    this.hotkeysOutilService.hotkeysOutil(event);
    this.hotkeysTravailService.hotkeysTravail(event);
  }
}
