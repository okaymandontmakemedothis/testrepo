import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss'],
})
export class ControlMenuComponent {

  constructor(private dialog: MatDialog) {
  }

  openNewDrawing() {
    this.dialog.open(NewDrawingComponent, {});
  }

}
