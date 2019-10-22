import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Drawing } from '../../../../../common/communication/drawing';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }
  getDrawings(): Observable<Drawing[]> {
    console.log('called');
    return this.http.get<Drawing[]>(environment.serverURL + '/drawings/').pipe(
      catchError(() => of([])),
    );

  }

}
