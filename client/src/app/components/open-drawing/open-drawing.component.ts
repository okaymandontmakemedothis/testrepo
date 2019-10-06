import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
