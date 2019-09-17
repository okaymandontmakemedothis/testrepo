import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { WelcomeMessage} from '../../../../../../common/communication/message'
import { AideDialogComponent } from '../aide-dialog/aide-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit{

  ischecked: boolean;
  messagePart1: string;
  messagePart2: string;

  constructor(public dialog: MatDialog, private http: HttpClient,
              public dialogRef: MatDialogRef<DialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { }

   openDialog() {

    const dialogRef = this.dialog.open(AideDialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxWidth: 1000,
      maxHeight: 500,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  getTextRessource() {
    this.http.get("http://localhost:3000/api/index/text").subscribe((res: WelcomeMessage) => {
      console.log(res);
      this.messagePart1 = res.body;
      this.messagePart2 = res.head;
    });
  }

  ngOnInit(): void {
    this.getTextRessource();

  }

  closeClick(): void {
    this.dialogRef.close(this.ischecked);
  }
 test(event: any) {
    this.ischecked = event.checked;
  }
}
