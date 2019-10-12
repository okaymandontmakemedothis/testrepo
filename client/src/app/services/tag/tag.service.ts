import { Injectable } from '@angular/core';
import { Tag } from '../../../../../common/communication/drawing';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  async retrieveTags(): Promise<string[]> {
    const tags: Tag[] = await this.http.get<Tag[]>('http://localhost:3000/api/tags').toPromise();
    return tags.map((tag) => tag.name);
  }
}
