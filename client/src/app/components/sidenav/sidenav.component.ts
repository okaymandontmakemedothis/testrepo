import { Component } from '@angular/core';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';
import { ToolsListService } from 'src/app/services/tools/tools-list.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private toggleDrawerService: ToggleDrawerService, public toolsListService: ToolsListService){
  }

  menuTopToolsList = this.toolsListService.toolsList;
  menuBottomIconList = [];

  toggle(){
    this.toggleDrawerService.toggle();
  }
}
