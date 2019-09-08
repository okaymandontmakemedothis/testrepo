import { Component, HostListener, OnInit } from '@angular/core';
import { DrawingService } from '../../services/drawing/drawing.service';

@Component({
  selector: 'app-new-drawing-form',
  templateUrl: './new-drawing-form.component.html',
  // styleUrls: ['./new-drawing-form.component.scss'],
})
export class NewDrawingFormComponent implements OnInit {
  innerWidth: number;
  innerHeight: number;

  ngOnInit(): void {
    this.innerWidth = this.drawing.getWidth();
    this.innerHeight = this.drawing.getHeight();
  }

  constructor(private drawing: DrawingService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = this.drawing.getWidth();
    this.innerHeight = this.drawing.getHeight();
  }
}
