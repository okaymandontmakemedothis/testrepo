import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-drawing-alert',
  templateUrl: './new-drawing-alert.component.html',
  styleUrls: ['./new-drawing-alert.component.scss'],
})
export class NewDrawingAlertComponent {

  constructor(public dialogRef: MatDialogRef<NewDrawingAlertComponent>) {
  }

}
