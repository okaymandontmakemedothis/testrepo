import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDrawerService {

  @Output() openningEvent = new EventEmitter();

  open() {
    this.openningEvent.emit();
  }
}
