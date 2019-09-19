import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
@Injectable({
  providedIn: 'root'
})
export class SelectToolService {
  currentIcon: IconDefinition ;
  constructor() { }
  setIcone(icon: IconDefinition) {
    this.currentIcon = icon;
    console.log('this.currentIcon');
  }
}
