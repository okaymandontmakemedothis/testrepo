import { Component } from '@angular/core';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {

<<<<<<< HEAD
  constructor(private toggleDrawerService: ToggleDrawerService, public toolsService: ToolsService) {
=======
  constructor(private toggleDrawerService: ToggleDrawerService) {
>>>>>>> master
  }

  menuTopToolsList = this.toolsService.toolsList;
  menuBottomIconList = [];

  toggle() {
    this.toggleDrawerService.toggle();
  }
}
