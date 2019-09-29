
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotkeysSelectionService {

  canExecute = true;

  constructor() { }

  hotkeysSelection(event: KeyboardEvent): string | void {
    if (this.canExecute) {
      if (event.ctrlKey && event.code === keyCodes.x) {
        event.preventDefault();
        return 'x';
      }

      if (event.ctrlKey && event.code === keyCodes.c) {
        event.preventDefault();
        return 'c';
      }

      if (event.ctrlKey && event.code === keyCodes.v) {
        event.preventDefault();
        return 'v';
      }

      if (event.ctrlKey && event.code === keyCodes.d) {
        event.preventDefault();
        return 'd';
      }

      if (event.code === keyCodes.delete) {
        event.preventDefault();
        return 'del';
      }

      if (event.ctrlKey && event.code === keyCodes.a) {
        event.preventDefault();
        return 'a';
      }

      if (event.ctrlKey && event.shiftKey && event.code === keyCodes.z) {
        event.preventDefault();
        return 'shz';
      }

      if (event.ctrlKey && event.code === keyCodes.z) {
        event.preventDefault();
        return 'z';
      }
    }
  }
}
