import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorMessageComponent } from 'src/app/error-message/error-message.component';
import { ErrorMessage } from 'src/app/model/error-message.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {

  constructor(private dialog: MatDialog) { }

  showError(errorTitle: string, errorDescription: string): void {
    const error: ErrorMessage = { title: errorTitle, description: errorDescription };
    this.dialog.open(ErrorMessageComponent, { data: error });
  }
}
