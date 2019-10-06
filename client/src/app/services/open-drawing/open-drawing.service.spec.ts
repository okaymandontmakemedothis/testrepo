import { TestBed } from '@angular/core/testing';

import { OpenDrawingService } from './open-drawing.service';

describe('OpenDrawingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
});
