import { Component, ElementRef, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {

  constructor(private el: ElementRef, private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.workspaceService.el = this.el;
  }
}
