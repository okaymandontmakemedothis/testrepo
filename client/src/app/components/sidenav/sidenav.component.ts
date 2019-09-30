import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ITools } from 'src/app/services/tools/ITools';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})

export class SidenavComponent {
  constructor(private sideNavService: SidenavService, private toolService: ToolsService) { }

  get currentToolId(): number {
    return this.toolService.selectedToolId;
  }

  get toolList(): ITools[] {
    return this.sideNavService.toolList;
  }

  get isOpened(): boolean {
    return this.sideNavService.isOpened;
  }

  get selectedParameter(): number {
    return this.sideNavService.selectedParameter;
  }

  open(): void {
    this.sideNavService.open();
  }

  close(): void {
    this.sideNavService.close();
  }

  selectionChanged(selectedItem: MatButtonToggleChange): void {
    this.sideNavService.selectionChanged(selectedItem);
  }

  openControlMenu(): void {
    this.sideNavService.openControlMenu();
  }
}
