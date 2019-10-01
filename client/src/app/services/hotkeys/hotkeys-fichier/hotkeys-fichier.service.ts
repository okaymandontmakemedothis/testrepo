
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';
import '../hotkeys-constants';

@Injectable({
  providedIn: 'root',
})
export class HotkeysFichierService {

  canExecute = true;
  @Output() hotkeysFichierEmitter = new EventEmitter();

  hotkeysFichier(event: KeyboardEvent) {
    if (this.canExecute) {
      if (event.ctrlKey && event.code === keyCodes.o) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit(emitReturn.NEW_DRAWING);
      }

      if (event.ctrlKey && event.code === keyCodes.s) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit('CS');
      }

      if (event.ctrlKey && event.code === keyCodes.g) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit('CG');
      }

      if (event.ctrlKey && event.code === keyCodes.e) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit('CE');
      }
    }
  }
}
