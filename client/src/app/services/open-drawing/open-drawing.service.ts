import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drawing } from '../../../../../common/communication/drawing';
import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  drawingList = new BehaviorSubject<Drawing[]>([]);

  constructor(private indexService: IndexService) {
    this.indexService.getDrawingPreview(); // subscribe(this.drawingList);
  }

}
