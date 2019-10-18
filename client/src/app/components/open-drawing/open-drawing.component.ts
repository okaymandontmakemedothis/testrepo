import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { RGBA } from 'src/app/model/rgba.model';

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
  drawingPreview = new BehaviorSubject<Drawing[]>([{
    id: '0',
    name: '', tags: [''], width: 0, height: 0, backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 1 },
    svg: '',
  }]);
  isLoaded = false;
  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>,
    private openDrawingService: OpenDrawingService,
    public drawingService: DrawingService,
    private renderer: Renderer2,
  ) {
    this.openDrawingService.getDrawings()
      .subscribe(this.drawingPreview);
    this.drawingPreview.subscribe(() => this.isLoaded = true);
  }

  getBackground(drawing: Drawing): string {
    const rgba: RGBA = drawing.backGroundColor;
    return `rgba(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b},${rgba.a})`;
  }

  getThumbnail(drawingObject: Drawing) {
    const container = document.getElementById(drawingObject.name);
    const svgThumbnail: SVGElement = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svgThumbnail, 'viewBox', `0 0 ${drawingObject.width} ${drawingObject.height}`);
    svgThumbnail.innerHTML = `${drawingObject.svg}`;
    if (container) {
      this.renderer.appendChild(container, svgThumbnail);
      console.log(container.innerHTML);
    }
  }

  // ouvre un nouveau dessin  avec l'ancien drawing
  openDrawing(drawing: Drawing) {
    console.log('open drawing');
    this.drawingService.isCreated = true;
    this.drawingService.openDrawing(drawing);
    this.dialogRef.close();

  }
  close(): void {
    this.dialogRef.close();
  }
}
