import { TestBed } from '@angular/core/testing';

import { ParameterMenuProviderService } from './parameter-menu-provider.service';

describe('ParameterMenuProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterMenuProviderService = TestBed.get(ParameterMenuProviderService);
    expect(service).toBeTruthy();
  });
});
