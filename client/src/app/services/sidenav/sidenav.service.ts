import { Injectable } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ITools } from '../tools/ITools';
import { ToolsService } from '../tools/tools.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {

  isControlMenu = false;

  constructor(private toggleDrawerService: ToggleDrawerService, private toolService: ToolsService) { }

  get toolList(): ITools[] {
    return this.toolService.tools;
  }

  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }

  get selectedParameter(): number {
    if (this.isControlMenu) {
      return this.toolList.length;
    }
    return this.toolService.selectedToolId;
  }

  open(): void {
    this.toggleDrawerService.open();
  }

  close(): void {
    this.toggleDrawerService.close();
    this.isControlMenu = false;
  }

  selectionChanged(selectedItem: MatButtonToggleChange): void {
    this.toolService.selectTool(selectedItem.value);
    this.isControlMenu = false;
  }

  openControlMenu(): void {
    this.isControlMenu = true;
    this.open();
  }
}
