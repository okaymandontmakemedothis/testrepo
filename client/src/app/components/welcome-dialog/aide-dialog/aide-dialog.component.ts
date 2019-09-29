<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
=======
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
>>>>>>> 353a1150539931da41f2743cdf6d776ebbee2cbb
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
<<<<<<< HEAD
  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>, private basicService: IndexService, ) {
    this.basicService.aideGet()
      .subscribe(this.messageA);
  }

=======

  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>, private basicService: IndexService, ) {
    // recevoir text de shortcut de index service grace a la fonction aideGet qui va chercher le JSON file text du cote du serveur
    this.basicService.aideGet()
      .subscribe(this.messageA);
  }
  // fonction close qui permet de fermer le mat dialog d'aide
>>>>>>> 353a1150539931da41f2743cdf6d776ebbee2cbb
  close(): void {
    this.dialogRef.close();
  }
}