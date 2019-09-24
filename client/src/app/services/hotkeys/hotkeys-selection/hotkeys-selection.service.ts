

////////////////////////////--IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotkeysSelectionService {

  canExecute: boolean = true;

  constructor() { }

  hotkeysSelection(event:KeyboardEvent){
    event.preventDefault();
    if(this.canExecute){
      if (event.ctrlKey && event.code == keyCodes.x) {
          
          return 'x';
      }

      if (event.ctrlKey && event.code == keyCodes.c) {
          
          return 'c';
      }

      if (event.ctrlKey && event.code == keyCodes.v) {
          
          return 'v';
      }

      if (event.ctrlKey && event.code == keyCodes.d) {
          
          return 'd';
      }

      if (event.code == keyCodes.delete) {
        
        return 'del';
      }

      if (event.ctrlKey && event.code == keyCodes.a) {
          
          return 'a';
      }

      if (event.ctrlKey && event.shiftKey && event.code == keyCodes.z) {
        
        return 'shz';

        return;
      }

      if (event.ctrlKey && event.code == keyCodes.z) {
          
          return 'z';
      }
    }
    return 'false';
  }
}
