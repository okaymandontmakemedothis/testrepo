import { Component, ElementRef, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {

  constructor(private el: ElementRef, private workspaceService: WorkspaceService, private toolsService: ToolsService) { }

  ngOnInit() {
    this.workspaceService.el = this.el;
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
