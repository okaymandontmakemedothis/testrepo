import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
// Service permettant d'enregistrer si le checkbox a ete cocher ou non
export class WelcomeDialogService {
  messageActivated: FormControl;
  form: FormGroup;
  constructor() {
    this.messageActivated = new FormControl(!this.isMessageNeedsToBeShowed);
    this.form = new FormGroup({
      messageActivated: this.messageActivated,
    });

    this.form.valueChanges.subscribe(() => {
      sessionStorage.setItem('showWelcomeMessage', String(!this.messageActivated.value));
    });
  }

  get isMessageNeedsToBeShowed(): boolean {
    const showMessage: string | null = sessionStorage.getItem('showWelcomeMessage');
    if (showMessage) {
      return showMessage === 'true';
    } else {
      return true;
    }
  }
}