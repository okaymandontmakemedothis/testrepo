import { TestBed } from '@angular/core/testing';

import { NewDrawingService } from './new-drawing.service';

describe('DrawingSizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewDrawingService = TestBed.get(NewDrawingService);
    expect(service).toBeTruthy();
  });
});
