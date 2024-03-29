
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmitReturn, KeyCodes } from '../hotkeys-constants';

/// Service de hotkey pour les fonctions de travail
@Injectable({
  providedIn: 'root',
})
export class HotkeysTravailService {

  canExecute = true;
  @Output() hotkeysTravailEmitter = new EventEmitter();

  /// Emet le enum de la fonction de travail associer au hotkey
  hotkeysTravail(event: KeyboardEvent): string | void {
    if (this.canExecute) {
      if (event.code === KeyCodes.g) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit(EmitReturn.ENABLE_GRID);
      }
      if (event.code === KeyCodes.m) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit(EmitReturn.DISABLE_GRID);
      }
      if (event.code === KeyCodes.addNP || (event.shiftKey && event.code === KeyCodes.equal)) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit(EmitReturn.ADD5_GRID);
      }
      if (event.code === KeyCodes.minus || event.code === KeyCodes.minusNP) {
        event.preventDefault();
        this.hotkeysTravailEmitter.emit(EmitReturn.SUB5_GRID);
      }
    }
  }
}
