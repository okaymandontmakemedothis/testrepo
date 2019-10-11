import { TestBed } from '@angular/core/testing';

import { OpenDrawingService } from './open-drawing.service';
import { HttpClientModule } from '@angular/common/http';

describe('OpenDrawingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
});
