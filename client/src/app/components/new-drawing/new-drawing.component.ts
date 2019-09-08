import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
  providers: [
    NewDrawingService,
    DrawingSizeValidatorService,
  ],
})
export class NewDrawingComponent implements OnInit {

  get form(): FormGroup {
    return this.newDrawingService.form;
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  constructor(
    public dialogRef: MatDialogRef<NewDrawingComponent>, private snackBar: MatSnackBar, private newDrawingService: NewDrawingService) { }

  onAccept(): void {
    this.snackBar.open('Drawing created', '', { duration: 1000, });
    this.newDrawingService.form.reset();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
