import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ToolIdConstants } from 'src/app/services/tools/toolIdConstants';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

  @ViewChild('workspaceEnv', { read: ElementRef, static: false })
  workspaceEnv: ElementRef;

  constructor(private el: ElementRef, private workspaceService: WorkspaceService, private sideNavService: SidenavService,
    private toolsService: ToolsService, private dialog: MatDialog, private hotkeysFichierService: HotkeysFichierService, private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysOutilService: HotkeysOutilService, private hotkeysTravailService: HotkeysTravailService) {

    this.dialog.afterAllClosed.subscribe(() => {
      this.hotkeysFichierService.canExecute = true;
      this.hotkeysSelectionService.canExecute = true;
      this.hotkeysOutilService.canExecute = true;
      this.hotkeysTravailService.canExecute = true;

      this.sideNavService.canClick = true;
    });

    this.hotkeysFichierService.hotkeysFichierEmitter.subscribe((value: string) => {
      if (value === 'newDrawing') {
        this.openDialog();
      }
    });

    this.hotkeysOutilService.hotkeysOutilEmitter.subscribe((value: string) => {
      if (value === 'crayon') {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.CRAYON_ID);
      }
      if (value === 'brush') {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.BRUSH_ID);
      }
      if (value === 'applicateur') {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.APPLICATEUR_ID);
      }
      if (value === 'rectangle') {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.RECTANGLE_ID);
      }
    });

  }

  ngOnInit() {
    this.workspaceService.el = this.el;

  }

  ngAfterViewInit(): void {
    this.openDialog();
    this.workspaceService.scrolledElement = this.workspaceEnv;
  }

  openDialog() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;

    this.sideNavService.canClick = false;
  }

  onRightClick(event: MouseEvent) {
    this.toolsService.onPressed(event);
    return false;
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

  @HostListener('window:keydown', ['$event'])
  listenHotkey(event: KeyboardEvent) {
    this.hotkeysFichierService.hotkeysFichier(event);
    this.hotkeysSelectionService.hotkeysSelection(event);
    this.hotkeysOutilService.hotkeysOutil(event);
    this.hotkeysTravailService.hotkeysTravail(event);
  }
}
