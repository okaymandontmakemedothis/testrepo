import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { WelcomeDialogService } from 'src/app/services/welcome-dialog/welcome-dialog.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  welcomeDialogRef: MatDialogRef<WelcomeDialogComponent>;
  welcomeDialogSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private welcomeService: WelcomeDialogService,
    private hotkeysFichierService: HotkeysFichierService,
    private hotkeysSelectionService: HotkeysSelectionService,
    private hotkeysOutilService: HotkeysOutilService,
    private hotkeysTravailService: HotkeysTravailService,
    private sideNavService: SidenavService,
  ) {
    this.dialog.afterAllClosed.subscribe(() => {
      this.hotkeysFichierService.canExecute = true;
      this.hotkeysSelectionService.canExecute = true;
      this.hotkeysOutilService.canExecute = true;
      this.hotkeysTravailService.canExecute = true;
      this.sideNavService.canClick = true;
    });
  }

  // Fonction qui ouvre le mat Dialog de bienvenue
  openDialog() {
    this.hotkeysFichierService.canExecute = false;
    this.hotkeysSelectionService.canExecute = false;
    this.hotkeysOutilService.canExecute = false;
    this.hotkeysTravailService.canExecute = false;
    this.sideNavService.canClick = false;

    this.welcomeDialogRef = this.dialog.open(WelcomeDialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxHeight: 500,
      maxWidth: 500,
    });
    this.welcomeDialogSub = this.welcomeDialogRef.afterClosed().subscribe(() => {
      this.hotkeysFichierService.canExecute = false;
      this.hotkeysSelectionService.canExecute = false;
      this.hotkeysOutilService.canExecute = false;
      this.hotkeysTravailService.canExecute = false;
      this.sideNavService.canClick = false;

      this.dialog.open(NewDrawingComponent);
    });
  }

  // Ouvre le mat dialog lorsque le browser est initialiser si le checkbox est non cocher
  ngOnInit() {
    if (this.welcomeService.shouldWelcomeMessageBeShown) {
      this.openDialog();
    }
  }

  /// Detruit le subscribe du welcomeDialogSub
  ngOnDestroy(): void {
    this.welcomeDialogSub.unsubscribe();
  }
}
