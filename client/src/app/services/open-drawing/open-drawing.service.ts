import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
import { Drawing } from '../../../../../common/communication/drawing';
// import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }
  getDrawings(): Observable<Drawing[]> {
    console.log('called');
    return this.http.get<Drawing[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(() => of([])),
    );

  }

}
