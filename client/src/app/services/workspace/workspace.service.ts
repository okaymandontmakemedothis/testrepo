import { ElementRef, Injectable } from '@angular/core';

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
      return this.scrolledElement.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }
}
