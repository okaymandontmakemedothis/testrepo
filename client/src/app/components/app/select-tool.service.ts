import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
@Injectable({
  providedIn: 'root'
})
export class SelectToolService {
private currentIcon: IconDefinition ;
constructor() { }


  setIcone(icon: IconDefinition) {

    this.currentIcon = icon;
    console.log('reussi');
  }
}
