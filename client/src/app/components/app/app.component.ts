import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
// import { HotkeysFichierService } from '../../services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
// import { HotkeysSelectionService } from '../../services/hotkeys/hotkeys-selection/hotkeys-selection.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private dialog: MatDialog) {
  }

  openDialog() {

    this.dialog.open(NewDrawingComponent, {});
  }
}
