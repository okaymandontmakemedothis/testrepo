import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { WelcomeDialogService } from 'src/app/services/welcome-dialog.service';
import { WelcomeMessage } from '../../../../../../common/communication/message';
import { IndexService } from '../../../services/index/index.service';
import { AideDialogComponent } from '../aide-dialog/aide-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  messageW = new BehaviorSubject<WelcomeMessage>({ body: '', end: '' });
  form: FormGroup;
  constructor(public dialog: MatDialog, private welcomeService: WelcomeDialogService,
    public dialogRef: MatDialogRef<DialogComponent>, private basicService: IndexService,
  ) {
    // recevoir text de bienvenue de index service grace a la fonction welcomeGet qui va chercher le JSON file text du cote du serveur
    this.basicService.welcomeGet()
      .subscribe(this.messageW);
  }

  // Fonction pour ouvrir le dialog d'aide
  openDialog() {
    this.dialog.open(AideDialogComponent, {
      hasBackdrop: true,
      autoFocus: false,
      disableClose: true,
      minWidth: 750,
      maxWidth: 750,
      maxHeight: 500,
    });
  }
  ngOnInit(): void {
    this.form = this.welcomeService.form;
  }
  // fonction closeClick qui permet de fermer le premier mat dialog du message de bienvenue
  closeClick(): void {
    this.dialogRef.close();
  }
}