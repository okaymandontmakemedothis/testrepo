import { Injectable, EventEmitter, Output } from '@angular/core';
import '../hotkeys-constants';

@Injectable({
  providedIn: 'root'
})
export class HotkeysFichierService {

  canExecute: boolean = true;
  @Output() dialog = new EventEmitter();

  constructor() { }

  hotkeysFichier(event:KeyboardEvent){
    if(this.canExecute){
        if (event.ctrlKey && event.keyCode == keyCodes.d) {
            event.preventDefault();
            this.dialog.emit();
        }

        if (event.ctrlKey && event.keyCode == keyCodes.s) {
            event.preventDefault();
            console.log(keyCodes.s);
        }

        if (event.ctrlKey && event.keyCode == keyCodes.g) {
            event.preventDefault();
            console.log(keyCodes.g);
        }

        if (event.ctrlKey && event.keyCode == keyCodes.e) {
            event.preventDefault();
            console.log(keyCodes.e);
        }
    }
  }
}
