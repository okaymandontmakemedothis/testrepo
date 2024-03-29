import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ShortcutClavier } from '../../../../../../common/communication/message';
import { IndexService } from '../../../services/index/index.service';

@Component({
  selector: 'app-aide-dialog',
  templateUrl: './aide-dialog.component.html',
  styleUrls: ['./aide-dialog.component.scss'],
})
export class AideDialogComponent {

  messageShortcut = new BehaviorSubject<ShortcutClavier>({
    O: '', S: '', G: '', E: '', X: '', C: '', V: '', D: '',
    Sup: '', A: '', Z: '', ShiftZ: '', Cray: '', W: '', P: '', Y: '', Aer: '', Rec: '', Ell: '', Poly: '',
    L: '', T: '', R: '', B: '', Eff: '', I: '', Sel: '', Gri: '', M: '', Aug: '', Dim: '',
  });

  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>, private basicService: IndexService, ) {
    /// recevoir text de shortcut de index service grace a la fonction aideGet qui va chercher le JSON file text du cote du serveur
    this.basicService.aideGet()
      .subscribe(this.messageShortcut);
  }
  /// fonction close qui permet de fermer le mat dialog d'aide
  close(): void {
    this.dialogRef.close();
  }
}
