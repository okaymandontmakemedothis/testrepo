import { Component, HostListener, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { NewDrawingAlertComponent } from './new-drawing-alert/new-drawing-alert.component';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker/color-picker.component';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
  providers: [
    NewDrawingService,
    DrawingSizeValidatorService,
  ],
})
export class NewDrawingComponent implements OnInit, AfterViewInit {

  @ViewChild(ColorPickerComponent, { static: false })
  colorPickerComponent: ColorPickerComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewDrawingComponent>, private snackBar: MatSnackBar,
    private newDrawingService: NewDrawingService, private drawingService: DrawingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }
  ngAfterViewInit(): void {
    this.colorPickerComponent.setFormColor({ r: 255, g: 255, b: 255 }, 1);
  }

  get form(): FormGroup {
    return this.newDrawingService.form;
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
    this.drawingService.setDrawingColor({ rgb: this.colorPickerComponent.rgb, a: this.colorPickerComponent.a });
    this.drawingService.setDimension(
      (this.newDrawingService.sizeGroup.get('width') as FormControl).value,
      (this.newDrawingService.sizeGroup.get('height') as FormControl).value,
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
