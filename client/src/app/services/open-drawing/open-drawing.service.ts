import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { Drawing } from '../../../../../common/communication/drawing';
// import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  drawingList = new BehaviorSubject<Drawing[]>([]);

  // constructor(private http: HttpClient) {
  // }
  // getDrawingPreview(): Observable<Drawing[]> {
  //   return this.http.get<Drawing[]>('http://localhost:3000/api/drawings/').pipe(
  //     catchError(this.handleError<Drawing[]>('getDrawingPreview')),
  //   );
  // constructor(private indexService: IndexService) {
  //   // this.indexService.getDrawingPreview(); // subscribe(this.drawingList);
  // }

}
