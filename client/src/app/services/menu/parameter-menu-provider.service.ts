import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParameterMenuProviderService {

  parameters: Subject<string[]>;

  setParameters(data: string[]) {
    this.parameters.next(data);
  }
}
