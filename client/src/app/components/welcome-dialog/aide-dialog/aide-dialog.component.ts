import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ShortcutClavier } from '../../../../../../common/communication/message';
import { IndexService } from '../../../services/index/index.service';

@Component({
  selector: 'app-aide-dialog',
  templateUrl: './aide-dialog.component.html',
  styleUrls: ['./aide-dialog.component.scss'],
})
export class AideDialogComponent {

  messageA = new BehaviorSubject<ShortcutClavier>({
    O: '', S: '', G: '', E: '', X: '', C: '', V: '', D: '',
    Sup: '', A: '', Z: '', ShiftZ: '', Cray: '', W: '', P: '', Y: '', Aer: '', Rec: '', Ell: '', Poly: '',
    L: '', T: '', R: '', B: '', Eff: '', I: '', Sel: '', Gri: '', M: '', Aug: '', Dim: ''
  });
  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>, private basicService: IndexService, ) {
    this.basicService.aideGet()
      .subscribe(this.messageA);
  }

  close(): void {
    this.dialogRef.close();
  }
}