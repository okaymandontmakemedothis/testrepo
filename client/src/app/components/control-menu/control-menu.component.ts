import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { DIALOG_PROPERTIES, WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog/welcome-dialog.component';

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
    this.dialog.open(WelcomeDialogComponent, DIALOG_PROPERTIES);
  }

}
