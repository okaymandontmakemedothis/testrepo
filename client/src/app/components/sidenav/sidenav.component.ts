import { Component } from '@angular/core';
import { FaIcons } from '../../../assets/assets.faicons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuTopIconList = FaIcons.menuTopIconList;
  menuBottomIconList = FaIcons.menuBottomIconList;
}
