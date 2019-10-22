import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Drawing } from '../../../../../common/communication/drawing';

@Injectable({
  providedIn: 'root',
})
export class GetDrawingRequestService {

  constructor(private http: HttpClient) { }

   getDrawings(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(environment.serverURL + '/drawings/').pipe(
      catchError(() => of([])),
    );
  }

}
