import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { OpenDrawingComponent } from '../open-drawing/open-drawing.component';
import { SaveDrawingComponent } from '../save-drawing/save-drawing.component';
import { DIALOG_PROPERTIES, WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog/welcome-dialog.component';

/// Component pour afficher les options fichiers
@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss'],
})
export class ControlMenuComponent {

  constructor(
    private dialog: MatDialog,
    private drawingService: DrawingService,
  ) {
  }

  get isSaved(): boolean {
    return this.drawingService.isSaved;
  }

  /// Ouvre une nouveau dialog de creation de dessin
  openNewDrawing(): void {
    this.dialog.open(NewDrawingComponent, {});
  }

  /// Ouvre le message de bienvenue
  openWelcomeMessage(): void {
    this.dialog.open(WelcomeDialogComponent, DIALOG_PROPERTIES);
  }

  /// Ouvrir le dialog de sauvegarde de dessin
  openSaveDrawing(): void {
    this.dialog.open(SaveDrawingComponent, { width: '600px', maxHeight: '800px' });
  }

  /// Ouvrir le dialog d'ouverture de fichier
  openOpenDrawing(): void {
    this.dialog.open(OpenDrawingComponent, {
      width: '800px',
      maxHeight: '800px',
      autoFocus: false

    });
  }
}
