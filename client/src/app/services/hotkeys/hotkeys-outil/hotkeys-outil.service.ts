
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';

/// Service de hotkey pour les outils
@Injectable({
  providedIn: 'root',
})
export class HotkeysOutilService {

  canExecute = true;
  @Output() hotkeysOutilEmitter = new EventEmitter();

  /// Emet le enum de l'outil associer au hotkey
  hotkeysOutil(event: KeyboardEvent): void {
    if (this.canExecute) {
      if (event.code === KeyCodes.c) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(EmitReturn.PENCIL);
      }

      if (event.code === KeyCodes.w) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(EmitReturn.BRUSH);
      }

      if (event.code === KeyCodes.p) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('P');
      }

      if (event.code === KeyCodes.y) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('Y');
      }

      if (event.code === KeyCodes.a) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('A');
      }

      if (event.code === KeyCodes.b1 || event.code === KeyCodes.np1) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(EmitReturn.RECTANGLE);
      }

      if (event.code === KeyCodes.b2 || event.code === KeyCodes.np2) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('2');
      }

      if (event.code === KeyCodes.b3 || event.code === KeyCodes.np3) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('3');
      }

      if (event.code === KeyCodes.l) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('L');
      }

      if (event.code === KeyCodes.t) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('T');
      }

      if (event.code === KeyCodes.r) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(EmitReturn.APPLICATEUR);
      }

      if (event.code === KeyCodes.b) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('B');
      }

      if (event.code === KeyCodes.e) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('E');
      }

      if (event.code === KeyCodes.i) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('I');
      }

      if (event.code === KeyCodes.s) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('S');
      }
    }
  }
}
