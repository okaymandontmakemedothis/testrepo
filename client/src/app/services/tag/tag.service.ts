import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Drawing, Tag } from '../../../../../common/communication/drawing';

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
  containsTag(drawing: Drawing, selectedTags: string[]): boolean {
    if (selectedTags.length < 1) {
      return true;
    }
    let containsTag = false;
    for (const tag of drawing.tags) {
      containsTag = selectedTags.includes(tag);
      if (containsTag) {
        return true;
      }
    }
    return false;
  }
}
