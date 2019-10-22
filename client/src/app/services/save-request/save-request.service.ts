import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Drawing } from '../../../../../common/communication/drawing';
import { Message } from '../../../../../common/communication/message';

@Injectable({
  providedIn: 'root',
})
export class SaveRequestService {

  constructor(private http: HttpClient) { }

  async addDrawing(drawing: Drawing): Promise<void> {
    await this.http.post<Message>(environment.serverURL + '/drawings',
      drawing, { observe: 'response' },
    ).toPromise();
  }
}
