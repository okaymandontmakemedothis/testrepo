import { TestBed } from '@angular/core/testing';

import { TexturesService } from './textures.service';

describe('TexturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TexturesService = TestBed.get(TexturesService);
    expect(service).toBeTruthy();
  });
});
