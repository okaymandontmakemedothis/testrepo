import { Injectable } from '@angular/core';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root',
})
export class ToolPointerService implements ITools {

  id = 0;

  name = 'Point';

  onPressed($event: MouseEvent): string {
    return 'Pressed';
  }

  onRelease($event: MouseEvent): string {
    return 'Release';
  }

  onMove($event: MouseEvent): string {
    return 'Move';
  }

  constructor() { }
}
