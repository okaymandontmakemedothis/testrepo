import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotkeysSelectionService {

  canExecute: boolean = true;

  constructor() { }

  hotkeysSelection(event:KeyboardEvent){
    if(this.canExecute){
      if (event.ctrlKey && event.keyCode == keyCodes.x) {
          event.preventDefault();
          console.log(keyCodes.x);
      }

      if (event.ctrlKey && event.keyCode == keyCodes.c) {
          event.preventDefault();
          console.log(keyCodes.c);
      }

      if (event.ctrlKey && event.keyCode == keyCodes.v) {
          event.preventDefault();
          console.log(keyCodes.v);
      }

      if (event.ctrlKey && event.keyCode == keyCodes.d) {
          event.preventDefault();
          console.log(keyCodes.d);
      }

      if (event.keyCode == keyCodes.delete) {
        event.preventDefault();
        console.log(keyCodes.delete);
      }

      if (event.ctrlKey && event.keyCode == keyCodes.a) {
          event.preventDefault();
          console.log(keyCodes.a);
      }

      if (event.ctrlKey && event.shiftKey && event.keyCode == keyCodes.z) {
        event.preventDefault();
        console.log(keyCodes.shift);
        return;
      }

      if (event.ctrlKey && event.keyCode == keyCodes.z) {
          event.preventDefault();
          console.log(keyCodes.z);
      }
    }
  }
}
