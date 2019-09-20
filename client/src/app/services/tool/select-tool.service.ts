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
    console.log('this.currentIcon');
  }
  getIcon(): IconDefinition {
    return this.currentIcon;
  }
}
