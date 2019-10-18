import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { Drawing } from '../../../../../common/communication/drawing';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  constructor(private http: HttpClient) {
  }
  getDrawings(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(() => of([])),
    );

  }
}
