import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IconGroup } from '../../../assets/assets.faicons-groups';

@Injectable({
  providedIn: 'root',
})
export class IconGroupAuthentificatorService {

  private currentIcon: IconDefinition;

  setCurrentIcon(icon: IconDefinition) {
    this.currentIcon = icon;
  }

  determineAsIconGroup(icon: IconDefinition): boolean {
    return IconGroup.groupIconLists.has(icon);
  }

  getIconGroup(): IconDefinition[] | undefined {
    if (this.determineAsIconGroup(this.currentIcon)) {
      return IconGroup.groupIconLists.get(this.currentIcon);
    }
    return undefined;
  }

}
