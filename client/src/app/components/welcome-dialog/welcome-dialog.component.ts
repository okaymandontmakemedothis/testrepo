import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
})
export class WelcomeDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  isChecked: boolean;
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxHeight: 500,
      maxWidth: 500,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.isChecked = result;
      if (this.isChecked) {
        sessionStorage.setItem('isChecked', 'true');
      }
    });
  }
  ngOnInit() {
    if (sessionStorage.getItem('isChecked') !== 'true') {
      this.openDialog();
    }
  }
}
