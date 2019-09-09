import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AideDialogComponent } from '../aide-dialog/aide-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  ischecked: boolean;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

   openDialog() {

    const dialogRef = this.dialog.open(AideDialogComponent, {
      hasBackdrop: true,
      panelClass: 'filter-popup',
      autoFocus: false,
      disableClose: true,
      maxWidth: 500,
      maxHeight: 500,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  closeClick(): void {
    this.dialogRef.close(this.ischecked);
  }
 test(event: any) {
    this.ischecked = event.checked;
  }
}
