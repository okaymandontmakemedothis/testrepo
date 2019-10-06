import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DrawingPreview } from '../../../../../common/communication/drawing';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {

  constructor(private http: HttpClient) {
  }
  getDrawingPreview(): Observable<DrawingPreview[]> {
    return this.http.get<DrawingPreview[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(this.handleError<DrawingPreview[]>('getDrawingPreview')),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}