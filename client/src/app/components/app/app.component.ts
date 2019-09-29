import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WelcomeDialogService } from 'src/app/services/welcome-dialog.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { DialogComponent } from '../welcome-dialog/dialog/dialog.component';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  welcomeDialogRef: MatDialogRef<DialogComponent>;
  welcomeDialogSub: Subscription;

  constructor(public dialog: MatDialog, private welcomeService: WelcomeDialogService) { }
  // Fonction qui ouvre le mat Dialog de bienvenue
  openDialog() {
    this.welcomeDialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxHeight: 500,
      maxWidth: 500,
    });
    this.welcomeDialogSub = this.welcomeDialogRef.afterClosed().subscribe(() => {
      this.dialog.open(NewDrawingComponent);
    });
  }

  // Ouvre le mat dialog lorsque le browser est initialiser si le checkbox est non cocher
  ngOnInit() {
    if (this.welcomeService.isMessageNeedsToBeShowed) {
      this.openDialog();
    }
  }

  /// Detruit le subscribe du welcomeDialogSub
  ngOnDestroy(): void {
    this.welcomeDialogSub.unsubscribe();
  }
}
