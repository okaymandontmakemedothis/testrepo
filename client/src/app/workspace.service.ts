import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {

  el: ElementRef;

  get width() {
    if (this.el) {
      return this.el.nativeElement.offsetWidth;
    } else {
      return 0;
    }
  }

  get height() {
    if (this.el) {
      return this.el.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }
}
