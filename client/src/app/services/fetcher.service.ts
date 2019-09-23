import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetcherService { // Could very well become HTTPService

  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get<string[]>(url);
  }
}
