import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// les deux imports devront eventuellement etre remplacees par des resources que l'on obtient au travers du serveur.
import { SpeedDialIcons } from '../assets/assets.faicons-speeddial';

@Injectable({
  providedIn: 'root',
})
export class IconService {

  private currentIcon: IconDefinition;

  setCurrentIcon(icon: IconDefinition) {
    this.currentIcon = icon;
  }

  determineAsSpeedDial(icon: IconDefinition): boolean {
    return SpeedDialIcons.speedDialIconLists.has(icon);
  }

  getSpeelDialIcons(): IconDefinition[] | undefined {
    if (this.determineAsSpeedDial(this.currentIcon)) {
      return SpeedDialIcons.speedDialIconLists.get(this.currentIcon);
    }
    return undefined;
  }

}
