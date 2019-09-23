import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIcons } from 'src/assets/assets.icons';

@Injectable({
  providedIn: 'root',
})
export class SelectToolService {
  currentIcon: IconDefinition ;
  constructor() { this.currentIcon = FaIcons.defaultSelectedTool; }
  setIcon(icon: IconDefinition) {
    this.currentIcon = icon;
  }
  getIcon(): IconDefinition {
    return this.currentIcon;
  }
}
