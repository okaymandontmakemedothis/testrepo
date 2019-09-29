import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { WelcomeMessage } from '../../../../../../common/communication/message';
import { IndexService } from '../../../services/index/index.service';
import { AideDialogComponent } from '../aide-dialog/aide-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  ischecked: boolean;
  messageW = new BehaviorSubject<WelcomeMessage>({ body: '', end: '' });

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>, private basicService: IndexService,
  ) {
    this.basicService.welcomeGet()
      .subscribe(this.messageW);
  }

  openDialog() {

    this.dialog.open(AideDialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxWidth: 1000,
      maxHeight: 500,
    });
  }

  closeClick(): void {
    this.dialogRef.close(this.ischecked);
  }

  test(event: any) {
    this.ischecked = event.checked;
  }
}
