import { Component } from '@angular/core';
import { ToggleDrawerService } from 'src/app/toggle-drawer.service';
import { FaIcons } from '../../../assets/assets.faicons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private toggleDrawerService: ToggleDrawerService){
  }

  menuTopIconList = FaIcons.menuTopIconList;
  menuBottomIconList = FaIcons.menuBottomIconList;

  toggle(){
    this.toggleDrawerService.toggle();
  }
}
