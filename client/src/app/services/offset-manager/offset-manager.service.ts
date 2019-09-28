import { Injectable } from '@angular/core';
import { WorkspaceService } from '../workspace/workspace.service';

@Injectable({
  providedIn: 'root',
})
export class OffsetManagerService {

  constructor(private workspaceService: WorkspaceService) { }

  offsetFromMouseEvent(event: MouseEvent): { x: number, y: number } {
    const x = event.pageX -
      this.workspaceService.el.nativeElement.getBoundingClientRect().x +
      this.workspaceService.scrolledElement.nativeElement.scrollLeft;
    const y = event.pageY -
      this.workspaceService.el.nativeElement.getBoundingClientRect().y +
      this.workspaceService.scrolledElement.nativeElement.scrollTop;
    return { x, y };
  }
}
