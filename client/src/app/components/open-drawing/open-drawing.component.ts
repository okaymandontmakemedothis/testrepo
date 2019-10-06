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
  parsedHtml : XMLDocument
  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>, private openDrawingService: OpenDrawingService) {
    this.openDrawingService.getDrawingPreview()
      .subscribe(this.drawingPreview);
      console.log(this.drawingPreview)


    }

    getThumbnail(){
      let parser = new DOMParser();
      console.log(this.drawingPreview.value[11])
      if(this.drawingPreview.value[12].thumbnail){
        this.parsedHtml = parser.parseFromString(this.drawingPreview.value[12].thumbnail, 'image/svg+xml');
        console.log(this.parsedHtml)

      }
      return this.parsedHtml      
    }

  close(): void {
    this.dialogRef.close();
  }
}
