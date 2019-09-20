import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { NewDrawingAlertComponent } from './new-drawing-alert/new-drawing-alert.component';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
  providers: [
    DrawingService,
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewDrawingComponent>, private snackBar: MatSnackBar,
              private newDrawingService: NewDrawingService, private drawingService: DrawingService, private dialog: MatDialog) { }

  onAccept(): void {
    if (this.data.drawingPresent) {
      const alert = this.dialog.open(NewDrawingAlertComponent, {
        role: 'alertdialog',
      });
      alert.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.drawingService.created = true;
          this.snackBar.open('Drawing created', '', { duration: 1000, });
          this.dialogRef.close();
        }
      });

    } else {
      this.snackBar.open('Drawing created', '', { duration: 1000, });
      this.drawingService.created = true;
      this.newDrawingService.form.reset();
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.newDrawingService.onResize();
  }

}