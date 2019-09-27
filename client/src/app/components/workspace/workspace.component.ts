import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { MatDialog } from '@angular/material';

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
