import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingAlertComponent } from '../new-drawing-alert/new-drawing-alert.component';

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

  constructor(
    public dialogRef: MatDialogRef<NewDrawingComponent>, private snackBar: MatSnackBar,
    private newDrawingService: NewDrawingService, private drawingService: DrawingService, private dialog: MatDialog) { }

  onAccept(): void {
    this.snackBar.open('Drawing created', '', { duration: 1000, });

    if (this.drawingService.created) {
      console.log(this.drawingService.created);
      this.dialog.open(NewDrawingAlertComponent, {});
      this.drawingService.created = true;
    } else {
      console.log(this.drawingService.created);
      this.drawingService.created = true;
      this.newDrawingService.form.reset();
      this.dialogRef.close();
    }
    // Logique de creation de nouveau dessin

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.newDrawingService.onResize();
  }

}
