import { TestBed } from '@angular/core/testing';

import { DrawingSizeValidatorService } from './drawing-size-validator.service';

describe('DrawingSizeValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawingSizeValidatorService = TestBed.get(DrawingSizeValidatorService);
    expect(service).toBeTruthy();
  });
});
