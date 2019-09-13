import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-aide-dialog',
  templateUrl: './aide-dialog.component.html',
  styleUrls: ['./aide-dialog.component.scss'],
})
export class AideDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  Close(): void {
    this.dialogRef.close();
  }
}
