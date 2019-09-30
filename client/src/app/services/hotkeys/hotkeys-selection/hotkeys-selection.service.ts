
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotkeysSelectionService {

  canExecute = true;
  @Output() hotkeysSelectionEmitter = new EventEmitter();

  hotkeysSelection(event: KeyboardEvent): string | void {
    if (this.canExecute) {
      if (event.ctrlKey && event.code === keyCodes.x) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CX');
      }

      if (event.ctrlKey && event.code === keyCodes.c) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CC');
      }

      if (event.ctrlKey && event.code === keyCodes.v) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CV');
      }

      if (event.ctrlKey && event.code === keyCodes.d) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CD');
      }

      if (event.code === keyCodes.delete) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('DEL');
      }

      if (event.ctrlKey && event.code === keyCodes.a) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CA');
      }

      if (event.ctrlKey && event.shiftKey && event.code === keyCodes.z) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CSZ');
      }

      if (event.ctrlKey && !event.shiftKey && event.code === keyCodes.z) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CZ');
      }
    }
  }
}
