

////////////////////////////--IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotkeysTravailService {

  canExecute: boolean = true;

  constructor() { }

  hotkeysTravail(event: KeyboardEvent) {
    event.preventDefault();
    if (this.canExecute) {
      if (event.code == keyCodes.g) {

        return 'g';
      }

      if (event.code == keyCodes.m) {

        return 'm';
      }

      if (event.code == keyCodes.addNP || (event.shiftKey && keyCodes.equal)) {

        return 'add';
      }

      if (event.code == keyCodes.minus || keyCodes.minusNP) {

        return 'min';
      }
    }
    return 'false';
  }
}
