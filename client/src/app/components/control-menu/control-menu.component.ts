import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { DIALOG_PROPERTIES, WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog/welcome-dialog.component';

/// Component pour afficher les options fichiers
@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss'],
})
export class ControlMenuComponent {

  constructor(private dialog: MatDialog) {
  }
  /// Ouvre une nouveau dialog de creation de dessin
  openNewDrawing(): void {
    this.dialog.open(NewDrawingComponent, {});
  }
  /// Ouvre le message de vienvenue
  openWelcomeMessage(): void {
    this.dialog.open(WelcomeDialogComponent, DIALOG_PROPERTIES);
  }

}
