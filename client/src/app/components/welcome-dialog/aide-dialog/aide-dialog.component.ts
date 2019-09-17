import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShortcutClavier } from '../../../../../../common/communication/message'

@Component({
  selector: 'app-aide-dialog',
  templateUrl: './aide-dialog.component.html',
  styleUrls: ['./aide-dialog.component.scss'],
})
export class AideDialogComponent implements OnInit {

  shortcut: string[];
  shortcut2: string[];
  shortcut3: string[];
  shortcut4: string[];
  constructor(
    public dialogRef: MatDialogRef<AideDialogComponent>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  Close(): void {
    this.dialogRef.close();
  }
  getTextRessource() {
    this.http.get("http://localhost:3000/api/index/text").subscribe((res: ShortcutClavier) => {
      console.log(res);
      this.shortcut = [res.O, res.S, res.G, res.E];
      this.shortcut2 = [res.X, res.C, res.V, res.D, res.Sup, res.A, res.Z, res.ShiftZ];
      this.shortcut3 = [res.Cray, res.W, res.P, res.Y, res.Aer, res.Rec, res.Ell, res.Poly,
        res.L, res.T, res.R, res.B, res.Eff, res.I, res.Sel];
      this.shortcut4 = [res.Gri, res.M, res.Aug, res.Dim];
    });
  }

  ngOnInit(): void {
    this.getTextRessource();

  }
}
