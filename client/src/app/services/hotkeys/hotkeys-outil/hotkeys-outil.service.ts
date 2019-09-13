

////////////////////////////--IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotkeysOutilService {
  canExecute: boolean = true;

  constructor() { }

  hotkeysOutil(event:KeyboardEvent){
    if(this.canExecute){
      if (event.code == keyCodes.c) {
        event.preventDefault();
        return 'c';
      }

      if (event.code == keyCodes.w) {
        event.preventDefault();
        return 'w';
      }

      if (event.code == keyCodes.p) {
        event.preventDefault();
        return 'p';
      }

      if (event.code == keyCodes.y) {
        event.preventDefault();
        return 'y';
      }

      if (event.code == keyCodes.a) {
        event.preventDefault();
        return 'a';
      }

      if (event.code == keyCodes.b1 || event.code == keyCodes.np1) {
        event.preventDefault();
        return '1';
      }

      if (event.code == keyCodes.b2 || event.code == keyCodes.np2) {
        event.preventDefault();
        return '2';
      }

      if (event.code == keyCodes.b3 || event.code == keyCodes.np3) {
        event.preventDefault();
        return '3';
      }

      if (event.code == keyCodes.l) {
        event.preventDefault();
        return 'l';
      }

      if (event.code == keyCodes.t) {
        event.preventDefault();
        return 't';
      }

      if (event.code == keyCodes.r) {
        event.preventDefault();
        return 'r';
      }

      if (event.code == keyCodes.b) {
        event.preventDefault();
        return 'b';
      }

      if (event.code == keyCodes.e) {
        event.preventDefault();
        return 'e';
      }

      if (event.code == keyCodes.i) {
        event.preventDefault();
        return 'i';
      }

      if (event.code == keyCodes.s) {
        event.preventDefault();
        return 's';
      }
    }
    return 'false';
  }
}
