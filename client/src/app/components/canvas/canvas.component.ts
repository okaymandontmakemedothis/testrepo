import { Component, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  height: number;
  width: number;
  backgroundColor: string;
  backgroundAlpha: number;

  constructor(private drawing: DrawingService) { }

  ngOnInit() {
    this.width = this.drawing.width;
    this.height = this.drawing.height;
    this.backgroundColor = this.drawing.colorString;
    this.backgroundAlpha = this.drawing.alpha;
  }

}
