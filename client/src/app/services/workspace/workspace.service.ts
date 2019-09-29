import { ElementRef, Injectable } from '@angular/core';
// Offset du workspace pour la hauteur pour remplir l'écran
export const HEIGHT_OFFSET = 4;

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

  el: ElementRef;
  scrolledElement: ElementRef;

  get width() {
    if (this.scrolledElement) {
      return this.scrolledElement.nativeElement.offsetWidth;
    } else {
      return 0;
    }
  }

  get height() {
    if (this.scrolledElement) {
      return this.scrolledElement.nativeElement.offsetHeight - HEIGHT_OFFSET;
    } else {
      return 0;
    }
  }
}
