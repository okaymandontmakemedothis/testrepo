import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  // styleUrls: ['./new-drawing.component.scss']
})
export class NewDrawingComponent implements OnInit {

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }


  constructor(
    public dialogRef: MatDialogRef<NewDrawingComponent>, private snackBar: MatSnackBar) { }

  onAccept(): void {
    this.snackBar.open('Drawing created', '', { duration: 1000, });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
