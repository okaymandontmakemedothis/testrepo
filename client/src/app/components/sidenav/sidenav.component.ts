import { Component } from '@angular/core';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {

  constructor(private toggleDrawerService: ToggleDrawerService, public toolsService: ToolsService){
  }

  menuTopToolsList = this.toolsService.tools;
  menuBottomIconList = [];

  toggle() {
    this.toggleDrawerService.toggle();
  }
}
