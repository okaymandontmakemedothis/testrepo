

////////////////////////////--IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////


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
    event.preventDefault();
    if(this.canExecute){
        if (event.ctrlKey && event.code == keyCodes.o) {
            this.dialog.emit();
        }

        if (event.ctrlKey && event.code == keyCodes.s) {
            this.dialog.emit();
        }

        if (event.ctrlKey && event.code == keyCodes.g) {
            this.dialog.emit();
        }

        if (event.ctrlKey && event.code == keyCodes.e) {
            this.dialog.emit();
        }
    }
  }
}
