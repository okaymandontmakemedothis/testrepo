import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tag } from '../../../../../common/communication/drawing';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TagService {

  constructor(private http: HttpClient) { }

  retrieveTags(): Observable<string[]> {
    return this.http.get<Tag[]>(environment.serverURL + '/tags')
      .pipe(map((res: Tag[]) => res.map((tag) => tag.name)),
        catchError((err) => of([])));
  }
}
