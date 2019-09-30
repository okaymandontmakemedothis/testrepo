<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { OpenWelcomeService } from 'src/app/services/openWelcome/open-welcome.service';
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WelcomeDialogService } from 'src/app/services/welcome-dialog/welcome-dialog.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog/welcome-dialog.component';
>>>>>>> master

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

<<<<<<< HEAD
=======
  welcomeDialogRef: MatDialogRef<WelcomeDialogComponent>;
  welcomeDialogSub: Subscription;
>>>>>>> master

  constructor( private openService: OpenWelcomeService) { }
  // Fonction qui ouvre le mat Dialog de bienvenue
<<<<<<< HEAD


  // Ouvre le mat dialog lorsque le browser est initialiser si le checkbox est non cocher
  ngOnInit() {
   this.openService.openOnStart();
=======
  openDialog() {
    this.welcomeDialogRef = this.dialog.open(WelcomeDialogComponent, {
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
    if (this.welcomeService.shouldWelcomeMessageBeShown) {
      this.openDialog();
    }
>>>>>>> master
  }

  /// Detruit le subscribe du welcomeDialogSub

}
