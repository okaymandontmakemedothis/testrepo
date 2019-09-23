import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDrawerService {

  @Output() toggled = new EventEmitter();

  toggle() {
    this.toggled.emit();
  }
}
