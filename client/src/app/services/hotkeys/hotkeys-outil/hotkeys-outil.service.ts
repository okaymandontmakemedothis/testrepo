
//////////////////////////// --IMPORTANT--///////////////////////////////
// Les tests seront a changer selon ce que l'on emet dans les hotkeys //
////////////////////////////////////////////////////////////////////////

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotkeysOutilService {

  canExecute = true;
  @Output() hotkeysOutilEmitter = new EventEmitter();

  hotkeysOutil(event: KeyboardEvent): void {
    if (this.canExecute) {
      if (event.code === keyCodes.c) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(emitReturn.PENCIL);
      }

      if (event.code === keyCodes.w) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(emitReturn.BRUSH);
      }

      if (event.code === keyCodes.p) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('P');
      }

      if (event.code === keyCodes.y) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('Y');
      }

      if (event.code === keyCodes.a) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('A');
      }

      if (event.code === keyCodes.b1 || event.code === keyCodes.np1) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(emitReturn.RECTANGLE);
      }

      if (event.code === keyCodes.b2 || event.code === keyCodes.np2) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('2');
      }

      if (event.code === keyCodes.b3 || event.code === keyCodes.np3) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('3');
      }

      if (event.code === keyCodes.l) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('L');
      }

      if (event.code === keyCodes.t) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('T');
      }

      if (event.code === keyCodes.r) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit(emitReturn.APPLICATEUR);
      }

      if (event.code === keyCodes.b) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('B');
      }

      if (event.code === keyCodes.e) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('E');
      }

      if (event.code === keyCodes.i) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('I');
      }

      if (event.code === keyCodes.s) {
        event.preventDefault();
        this.hotkeysOutilEmitter.emit('S');
      }
    }
  }
}
