import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiDef } from '../../../../../common/communication/api-def';
import { Drawing } from '../../../../../common/communication/drawing';

const SERVER_ADDRESS = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {

  apiDef: ApiDef;

  constructor(private http: HttpClient) {
    this.http.get<ApiDef>(SERVER_ADDRESS).toPromise().then((api: ApiDef) => this.apiDef);
  }

  async getAllDrawings(): Promise<Drawing> {
    return this.http.get<Drawing>(SERVER_ADDRESS + this.apiDef.drawing).toPromise();
  }

}
