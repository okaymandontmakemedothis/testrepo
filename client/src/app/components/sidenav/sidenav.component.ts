import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { ITools } from 'src/app/services/tools/ITools';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})

export class SidenavComponent {

  isControlMenu = false;

  constructor(private sideNavService: SidenavService) { }

  get toolList(): ITools[] {
    return this.sideNavService.toolList;
  }

  get isOpened(): boolean {
    return this.sideNavService.isOpened;
  }

  get selectedTool(): number {
    return this.sideNavService.selectedTool;
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
