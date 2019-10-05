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

  /// Choisi un paramettre
  get selectedParameter(): number {
    return this.sideNavService.selectedParameter;
  }

  /// Ouvre le sidenav
  open(): void {
    this.sideNavService.open();
  }
  /// Ferme le sidenav
  close(): void {
    this.sideNavService.close();
  }

  /// Changer la selection avec un toggle button
  selectionChanged(selectedItem: MatButtonToggleChange): void {
    this.sideNavService.selectionChanged(selectedItem);
  }

  /// Ouvre le menu control
  openControlMenu(): void {
    this.sideNavService.openControlMenu();
  }
}
