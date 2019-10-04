import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ToolIdConstants } from 'src/app/services/tools/tool-id-constants';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { EmitReturn } from '../../services/hotkeys/hotkeys-constants';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

  @ViewChild('workspaceEnv', { read: ElementRef, static: false })
  workspaceEnv: ElementRef;

  constructor(
    private el: ElementRef,
    private workspaceService: WorkspaceService,
    private sideNavService: SidenavService,
    private toolsService: ToolsService,
    private dialog: MatDialog,
    private hotkeysFichierService: HotkeysFichierService,
    private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysOutilService: HotkeysOutilService,
    private hotkeysTravailService: HotkeysTravailService,
  ) {
    this.dialog.afterAllClosed.subscribe(() => {
      this.hotkeysFichierService.canExecute = true;
      this.hotkeysSelectionService.canExecute = true;
      this.hotkeysOutilService.canExecute = true;
      this.hotkeysTravailService.canExecute = true;
      this.sideNavService.canClick = true;
    });
    this.subscribeToHotkeys();
  }

  ngOnInit() {
    this.workspaceService.el = this.el;
  }

  ngAfterViewInit(): void {
    this.workspaceService.scrolledElement = this.workspaceEnv;
  }
  /// Met les canExacute des hotkeys a false et ouvre un NewDrawingComponent
  openDialog() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;
    this.sideNavService.canClick = false;

    this.dialog.open(NewDrawingComponent);
  }

  /// Subscribe au hotkeys pour effectuer l'action associé
  private subscribeToHotkeys(): void {
    this.hotkeysFichierService.hotkeysFichierEmitter.subscribe((value: string) => {
      if (value === EmitReturn.NEW_DRAWING) {
        this.disableHotkeys();
        this.openDialog();
      }
    });
    this.hotkeysOutilService.hotkeysOutilEmitter.subscribe((value: string) => {
      if (value === EmitReturn.PENCIL) {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.PENCIL_ID);
      }
      if (value === EmitReturn.BRUSH) {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.BRUSH_ID);
      }
      if (value === EmitReturn.APPLICATEUR) {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.APPLIER_ID);
      }
      if (value === EmitReturn.RECTANGLE) {
        this.sideNavService.open();
        this.toolsService.selectTool(ToolIdConstants.RECTANGLE_ID);
      }
    });
  }

  /// Met les canExecutes des hotkeys a false
  private disableHotkeys() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;
    this.sideNavService.canClick = false;
  }

  /// Effectue un onPress sur le clique droit de la sourie
  onRightClick(event: MouseEvent) {
    this.toolsService.onPressed(event);
    return false;
  }

  /// Effectue un onPress sur le clique gauche de la sourie
  onMouseDown(event: MouseEvent) {
    this.toolsService.onPressed(event);
  }

  /// Effectue un onRelease quand le clique de la sourie est relaché
  onMouseUp(event: MouseEvent) {
    this.toolsService.onRelease(event);
  }

  /// Effectue un onMove quand la sourie bouge
  onMouseMove(event: MouseEvent) {
    this.toolsService.onMove(event);
  }

  /// Écoute le clavier pour envoyer l'évenement a la sourie
  @HostListener('window:keydown', ['$event'])
  listenHotkey(event: KeyboardEvent) {
    this.hotkeysFichierService.hotkeysFichier(event);
    this.hotkeysSelectionService.hotkeysSelection(event);
    this.hotkeysOutilService.hotkeysOutil(event);
    this.hotkeysTravailService.hotkeysTravail(event);
  }
}
