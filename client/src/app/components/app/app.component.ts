import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly title: string = 'PolyDessin E16';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(NewDrawingComponent, {
      data: { drawingPresent: false },
    });
  }

  openDialog() {
    this.dialog.open(NewDrawingComponent, {
      data: { drawingPresent: true },
    });
  }
}
