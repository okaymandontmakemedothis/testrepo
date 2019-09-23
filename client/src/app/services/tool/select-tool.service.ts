import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
@Injectable({
  providedIn: 'root',
})
export class SelectToolService {
  currentIcon: IconDefinition ;
  constructor() { }
  setIcon(icon: IconDefinition) {
    this.currentIcon = icon;
  }
  getIcon(): IconDefinition {
    return this.currentIcon;
  }
}
