import { Injectable } from '@angular/core';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root',
})
export class PencilToolService implements ITools {
  id: number;

  constructor() { }

  onPressed($event: MouseEvent): string {
    throw new Error("Method not implemented.");
  }
  onRelease($event: MouseEvent): string {
    throw new Error("Method not implemented.");
  }
  onMove($event: MouseEvent): string {
    throw new Error("Method not implemented.");
  }
}
