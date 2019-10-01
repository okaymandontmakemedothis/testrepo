import { TestBed } from '@angular/core/testing';

import { ParameterComponentService } from './parameter-component.service';
import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';

describe('ParameterComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('parameter-component service should be created', () => {
    const service: ParameterComponentService = TestBed.get(ParameterComponentService);
    expect(service).toBeTruthy();
  });

  it('should getComponent', () => {
    const service: ParameterComponentService = TestBed.get(ParameterComponentService);
    spyOn(service, 'getComponent').and.callThrough();
    expect(service.getComponent(0)).toEqual(PencilToolParameterComponent);
  });
});
