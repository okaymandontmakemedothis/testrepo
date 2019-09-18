import { Component, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FaIcons } from '../../../assets/assets.faicons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() toggleDrawer = new EventEmitter();
  menuTopIconList = FaIcons.menuTopIconList;
  menuBottomIconList = FaIcons.menuBottomIconList;
}
