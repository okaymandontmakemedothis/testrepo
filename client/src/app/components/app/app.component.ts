import { Component, HostListener, AfterViewInit } from '@angular/core';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { MatDialog } from '@angular/material/dialog';
import { HotkeysFichierService } from '../../services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysSelectionService } from '../../services/hotkeys/hotkeys-selection/hotkeys-selection.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  constructor(private dialog: MatDialog, private hotkeyFichierService:HotkeysFichierService, private hotkeySelectionService:HotkeysSelectionService) {
    
    this.dialog.afterAllClosed.subscribe(() => {this.hotkeyFichierService.canExecute = true; this.hotkeySelectionService.canExecute = true;})
    this.hotkeyFichierService.dialog.subscribe(() => this.openDialog());
  }

  openDialog() {
    this.hotkeyFichierService.canExecute = false;
    this.hotkeySelectionService.canExecute = false;
    this.dialog.open(NewDrawingComponent, { });
  }

  @HostListener('window:keydown', ['$event'])
  hotkey(event:KeyboardEvent){
     this.hotkeyFichierService.hotkeysFichier(event);
     this.hotkeySelectionService.hotkeysSelection(event);
  }

  readonly title: string = 'PolyDessin E16';

  ngAfterViewInit(): void {
    this.dialog.open(NewDrawingComponent, {
    });

  }
}
