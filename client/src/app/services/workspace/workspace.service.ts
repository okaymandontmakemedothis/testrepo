import { ElementRef, Injectable, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService implements OnChanges {

  el: ElementRef;

  @Output()
  elReady: EventEmitter = new EventEmitter();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.el) {
      this.elReady.emit('ready');
    }
  }

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
