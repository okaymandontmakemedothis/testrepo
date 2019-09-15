import { Component } from '@angular/core';
import { FaIcons } from '../../../assets/assets.faicons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {
  menuTopIconList = FaIcons.menuTopIconList;
  menuBottomIconList = FaIcons.menuBottomIconList;
}
