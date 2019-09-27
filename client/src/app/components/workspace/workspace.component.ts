import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef, private workspaceService: WorkspaceService,
              private toolsService: ToolsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.workspaceService.el = this.el;

  }

  ngAfterViewInit(): void {
    this.dialog.open(NewDrawingComponent, {
    });
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
}
