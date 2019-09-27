import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDrawerService {

  isOpened = true;

  @Output()
  openningEvent = new EventEmitter();

  @Output()
  closingEvent = new EventEmitter();

  open() {
    this.openningEvent.emit();
    this.isOpened = true;
  }

  close() {
    this.closingEvent.emit();
    this.isOpened = false;
  }

}
