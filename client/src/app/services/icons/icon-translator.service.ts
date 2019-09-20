import { Injectable } from '@angular/core';
import { findIconDefinition, IconDefinition, IconName, IconPrefix, } from '@fortawesome/fontawesome-svg-core'

@Injectable({
  providedIn: 'root'
})
export class IconTranslatorService {

  constructor() {
    const variable: IconName = 'coffee';
    console.log('from icon-translator.service.ts 1' + this.translate('coffee'));
    console.log('from icon-translator.service.ts 2' + this.translate(variable));
  }

  translate(iconString: IconName): IconDefinition {
    const faUser: {prefix: IconPrefix, iconName: IconName} = { prefix: 'fab', iconName: iconString};
    return findIconDefinition(faUser);
  }

}
