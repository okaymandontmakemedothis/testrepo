
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotkeysTravailService {

  canExecute = true;
  @Output() hotkeysTravailEmitter = new EventEmitter();

  hotkeysTravail(event: KeyboardEvent): string | void {
    if (this.canExecute) {
      if (event.code === keyCodes.g) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit('G');
      }

      if (event.code === keyCodes.m) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit('M');
      }

      if (event.code === keyCodes.addNP || (event.shiftKey && event.code === keyCodes.equal)) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit('+');
      }

      if (event.code === keyCodes.minus || event.code === keyCodes.minusNP) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit('-');
      }
    }
  }
}
