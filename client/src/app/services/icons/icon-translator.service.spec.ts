import { TestBed } from '@angular/core/testing';

import { IconTranslatorService } from './icon-translator.service';

describe('IconTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IconTranslatorService = TestBed.get(IconTranslatorService);
    expect(service).toBeTruthy();
  });
});
