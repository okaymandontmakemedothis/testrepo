

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
    event.preventDefault();
    if(this.canExecute){
      if (event.code == keyCodes.c) {
        
        return 'c';
      }

      if (event.code == keyCodes.w) {
        
        return 'w';
      }

      if (event.code == keyCodes.p) {
        
        return 'p';
      }

      if (event.code == keyCodes.y) {
        
        return 'y';
      }

      if (event.code == keyCodes.a) {
        
        return 'a';
      }

      if (event.code == keyCodes.b1 || event.code == keyCodes.np1) {
        
        return '1';
      }

      if (event.code == keyCodes.b2 || event.code == keyCodes.np2) {
        
        return '2';
      }

      if (event.code == keyCodes.b3 || event.code == keyCodes.np3) {
        
        return '3';
      }

      if (event.code == keyCodes.l) {
        
        return 'l';
      }

      if (event.code == keyCodes.t) {
        
        return 't';
      }

      if (event.code == keyCodes.r) {
        
        return 'r';
      }

      if (event.code == keyCodes.b) {
        
        return 'b';
      }

      if (event.code == keyCodes.e) {
        
        return 'e';
      }

      if (event.code == keyCodes.i) {
        
        return 'i';
      }

      if (event.code == keyCodes.s) {
        
        return 's';
      }
    }
    return 'false';
  }
}
