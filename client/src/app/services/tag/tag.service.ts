import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../../../../../common/communication/drawing';

@Injectable({
  providedIn: 'root',
})
export class TagService {

  constructor(private http: HttpClient) { }

  async retrieveTags(): Promise<string[]> {
    try {
      const tags: Tag[] = await this.http.get<Tag[]>('http://localhost:3000/api/tags').toPromise();
      return tags.map((tag) => tag.name);
    } catch (error) {
      return [];
    }
  }
}
