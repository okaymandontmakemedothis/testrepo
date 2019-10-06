import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { BehaviorSubject } from 'rxjs';
import { DrawingPreview } from '../../../../../common/communication/drawing';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent {

  drawingPrview = new BehaviorSubject<DrawingPreview>({name: '', tags: [''], width: 0, height: 0, thumbnail: '' });
 
  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>, private openDrawingService: OpenDrawingService) {
    this.openDrawingService.getDrawingPreview()
      .subscribe(this.drawingPrview);
    }

  close(): void {
    this.dialogRef.close();
  }
}
