import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import {  Drawing } from '../../../../../common/communication/drawing';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent {
  selectedDrawing: Drawing;
  drawingPreview = new BehaviorSubject<Drawing[]>([{
    name: '', tags: [''], width: 0, height: 0, backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 1 },
    drawingObjects: [], thumbnail: '' }]);
  constructor(

    public dialogRef: MatDialogRef<OpenDrawingComponent>,
    private openDrawingService: OpenDrawingService, public drawingService: DrawingService) {
    this.drawingPreview = this.openDrawingService.drawingList;
    }
    // loader le thumbnail
    getThumbnail(drawingObject: Drawing) {
      const container = document.getElementById(drawingObject.name);
      if (container) {container.innerHTML = `<svg  _ngcontent-gmu-c13="" version="1.1"
      xmlns="http://www.w3.org/2000/svg" width=${drawingObject.width} height=${drawingObject.height}>${drawingObject.thumbnail}</svg>`; }
    }
    // ouvre un nouveau dessin  avec l'ancien drawing
    openDrawing(drawing: Drawing) {
      this.drawingService.isCreated = true;
      this.drawingService.newDrawing(drawing.width, drawing.height, drawing.backGroundColor);
      this.drawingService.addDrawingObjectList(drawing.drawingObjects);
      this.dialogRef.close();

    }
    close(): void {
    this.dialogRef.close();
  }
}
