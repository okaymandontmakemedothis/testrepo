import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { DialogComponent } from '../welcome-dialog/dialog/dialog.component';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss'],
})
export class ControlMenuComponent {

  constructor(private dialog: MatDialog) {
  }

  openNewDrawing(): void {
    this.dialog.open(NewDrawingComponent, {});
  }

  openWelcomeMessage(): void {
    this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxHeight: 500,
      maxWidth: 500,
    });
  }

}
