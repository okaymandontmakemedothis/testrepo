
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';
import { KeyCodes } from '../hotkeys-constants';

/// Service de hotkey pour les fonctions de selection
@Injectable({
  providedIn: 'root',
})
export class HotkeysSelectionService {

  canExecute = true;
  @Output() hotkeysSelectionEmitter = new EventEmitter();

  /// Emet le enum de la fonction de selection associer au hotkey
  hotkeysSelection(event: KeyboardEvent): string | void {
    if (this.canExecute) {
      if (event.ctrlKey && event.code === KeyCodes.x) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CX');
      }

      if (event.ctrlKey && event.code === KeyCodes.c) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CC');
      }

      if (event.ctrlKey && event.code === KeyCodes.v) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CV');
      }

      if (event.ctrlKey && event.code === KeyCodes.d) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CD');
      }

      if (event.code === KeyCodes.delete) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('DEL');
      }

      if (event.ctrlKey && event.code === KeyCodes.a) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CA');
      }

      if (event.ctrlKey && event.shiftKey && event.code === KeyCodes.z) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CSZ');
      }

      if (event.ctrlKey && !event.shiftKey && event.code === KeyCodes.z) {
        event.preventDefault();
        this.hotkeysSelectionEmitter.emit('CZ');
      }
    }
  }
}
