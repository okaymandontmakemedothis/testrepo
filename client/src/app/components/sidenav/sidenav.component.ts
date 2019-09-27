import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { ITools } from 'src/app/services/tools/ITools';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})

export class SidenavComponent {

  isControlMenu = false;

  constructor(private toggleDrawerService: ToggleDrawerService, private toolService: ToolsService) { }

  get toolList(): ITools[] {
    return this.toolService.tools;
  }

  get currentTool(): ITools {
    return this.toolService.selectedTools;
  }

  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }

  get selectedTool(): number {
    if (this.isControlMenu) {
      return this.toolList.length;
    }
    return this.toolService.selectedTools.id;
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
