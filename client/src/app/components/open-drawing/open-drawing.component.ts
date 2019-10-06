import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { BehaviorSubject } from 'rxjs';
import {  Drawing } from '../../../../../common/communication/drawing';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent {

  drawingPreview = new BehaviorSubject<Drawing[]>([{
    name: '', tags: [''], width: 0, height: 0, backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 1 },
    drawingObjects: [], thumbnail: '' }]);
 
  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>, private openDrawingService: OpenDrawingService) {
    this.openDrawingService.getDrawingPreview()
      .subscribe(this.drawingPreview);
    }

  close(): void {
    this.dialogRef.close();
  }
}
