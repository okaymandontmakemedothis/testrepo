import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Drawing } from '../../../../../common/communication/drawing';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {

  constructor(private http: HttpClient) {
  }
  getDrawingPreview(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(this.handleError<Drawing[]>('getDrawingPreview')),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
