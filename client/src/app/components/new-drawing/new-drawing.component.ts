import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DrawingService } from '../../services/drawing/drawing.service';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  // styleUrls: ['./new-drawing.component.scss']
})
export class NewDrawingComponent implements OnInit {

  innerWidth: number;
  innerHeight: number;

  ngOnInit(): void {
    this.innerWidth = this.drawing.getWidth();
    this.innerHeight = this.drawing.getHeight();
  }

  constructor(
    public dialogRef: MatDialogRef<NewDrawingComponent>, private drawing: DrawingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = this.drawing.getWidth();
    this.innerHeight = this.drawing.getHeight();
  }

}
