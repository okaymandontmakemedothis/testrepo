import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Drawing, DrawingPreview } from '../../../../../common/communication/drawing';
import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  drawingList = new BehaviorSubject<Drawing[]>([]);

  constructor(private http: HttpClient, private indexService: IndexService) {
    this.indexService.getDrawingPreview().subscribe(this.drawingList);
  }

}
