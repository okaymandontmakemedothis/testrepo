import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import '../../services/hotkeys/hotkeys-constants';

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
    private toolsService: ToolsService,
  ) {
  }

  ngOnInit() {
    this.workspaceService.el = this.el;
  }

  ngAfterViewInit(): void {
    this.workspaceService.scrolledElement = this.workspaceEnv;
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
}
