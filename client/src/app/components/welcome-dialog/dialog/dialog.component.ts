import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WelcomeMessage} from '../../../../../../common/communication/message';
import { IndexService } from '../../../services/index/index.service';
import { AideDialogComponent } from '../aide-dialog/aide-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  ischecked: boolean;
  messagePart1: string;
  messagePart2: string;
  messageW = new BehaviorSubject<WelcomeMessage>({"body":"","end":""});

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogComponent>, private basicService: IndexService,
              @Inject(MAT_DIALOG_DATA) public welcomeMessage: WelcomeMessage) {
    this.basicService.welcomeGet()
      .subscribe(this.messageW);
      console.log(this.messageW);
              }

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
  /*getTextRessource() {
    this.http.get("http://localhost:3000/api/index/text").subscribe((res: WelcomeMessage) => {
      console.log(res);
      this.messagePart1 = res.body;
      this.messagePart2 = res.end;
    });
  }*/

  ngOnInit(): void {
    //this.getTextRessource();

  }

  closeClick(): void {
    this.dialogRef.close(this.ischecked);
  }
 test(event: any) {
    this.ischecked = event.checked;
  }
}
