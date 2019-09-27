import { TestBed } from '@angular/core/testing';

import { ParameterComponentService } from './parameter-component.service';

describe('ParameterComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterComponentService = TestBed.get(ParameterComponentService);
    expect(service).toBeTruthy();
  });
});
