import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent {

  tagCtrl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;

  selectedDrawing: Drawing;
  drawingPreview = new BehaviorSubject<Drawing[]>([]);
  isLoaded = false;
  // parsedHtml : XMLDocument
  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>,
    // private openDrawingService: OpenDrawingService,
    public drawingService: DrawingService,
    private renderer: Renderer2,
  ) {
    // this.openDrawingService.getDrawingPreview()
    //   .subscribe(this.drawingPreview);
    // this.drawingPreview.subscribe(() => this.isLoaded = true);
  }

  getThumbnail(drawingObject: Drawing) {

    const container = document.getElementById(drawingObject.name);

    if (container) {
      this.renderer.setAttribute(container, 'viewBox', `0 0 ${drawingObject.width} ${drawingObject.height}`);
      container.innerHTML = `${drawingObject.svg}`;
    }
  }

  selectDrawing(drawing: Drawing) {
    return;
  }

  // ouvre un nouveau dessin  avec l'ancien drawing
  openDrawing(drawing: Drawing) {
    console.log('open drawing');
    this.drawingService.isCreated = true;
    this.drawingService.newDrawing(drawing.width, drawing.height, drawing.backGroundColor);
    this.dialogRef.close();

  }
  close(): void {
    this.dialogRef.close();
  }
}
