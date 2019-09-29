import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { WelcomeDialogService } from 'src/app/services/welcome-dialog.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
})
export class WelcomeDialogComponent implements OnInit {
  constructor(public dialog: MatDialog, private welcomeService: WelcomeDialogService) { }
  // Fonction qui ouvre le mat Dialog de bienvenue
  openDialog() {
    this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxHeight: 500,
      maxWidth: 500,
    });
  }
  // Ouvre le mat dialog lorsque le browser est initialiser si le checkbox est non cocher
  ngOnInit() {
    if (!(this.welcomeService.form.get('messageActivated') as FormControl).value) {
      this.openDialog();
    }
  }
}