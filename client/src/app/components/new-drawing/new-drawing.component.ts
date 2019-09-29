import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { NewDrawingAlertComponent } from './new-drawing-alert/new-drawing-alert.component';

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
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDrawingComponent>,
    private snackBar: MatSnackBar,
    private newDrawingService: NewDrawingService,
    private drawingService: DrawingService,
    private dialog: MatDialog,
    private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.form = this.newDrawingService.form;
    this.dialogRef.disableClose = true;
    this.dialogRef.afterOpened().subscribe(() => this.onResize());
    this.colorPickerService.setFormColor({ r: 255, g: 255, b: 255 }, 1);
  }

  onAccept(): void {
    if (this.drawingService.created) {
      const alert = this.dialog.open(NewDrawingAlertComponent, {
        role: 'alertdialog',
      });
      alert.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.newDrawing();
        }
      });
    } else {
      this.newDrawing();
    }
  }

  private newDrawing() {
    this.drawingService.created = true;
    const size: { width: number, height: number } = this.newDrawingService.sizeGroup.value;
    this.drawingService.newDrawing(size.width, size.height,
      { rgb: this.colorPickerService.rgb.value, a: this.colorPickerService.a.value },
    );
    this.snackBar.open('Drawing created', '', { duration: 1000, });
    this.newDrawingService.form.reset();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.newDrawingService.onResize();
  }

}
