
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmitReturn, KeyCodes } from '../hotkeys-constants';

/// Service de hotkey pour les fonctions de fichier
@Injectable({
  providedIn: 'root',
})
export class HotkeysFichierService {

  canExecute = true;
  @Output() hotkeysFichierEmitter = new EventEmitter();

  /// Emet le enum de la fonction de fichier associer au hotkey
  hotkeysFichier(event: KeyboardEvent) {
    if (this.canExecute) {
      if (event.ctrlKey && event.code === KeyCodes.o) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit(EmitReturn.NEW_DRAWING);
      }

      if (event.ctrlKey && event.code === KeyCodes.s) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit(EmitReturn.SAVE_DRAWING);
      }

      if (event.ctrlKey && event.code === KeyCodes.g) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit(EmitReturn.OPEN_DRAWING);
      }

      if (event.ctrlKey && event.code === KeyCodes.e) {
        event.preventDefault();
        this.hotkeysFichierEmitter.emit('CE');
      }
    }
  }
}
