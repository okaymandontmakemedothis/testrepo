import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
// Service permettant d'enregistrer si le checkbox a ete cocher ou non
export class WelcomeDialogService {
  messageActivated: FormControl;
  form: FormGroup;
  constructor() {
    this.messageActivated = new FormControl(false);
    this.form = new FormGroup({
      messageActivated: this.messageActivated,
    });
  }
}