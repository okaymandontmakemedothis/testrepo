import { TestBed } from '@angular/core/testing';

import { ToolsApplierColorsService } from './tools-applier-colors.service';

describe('ToolsApplierColorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    expect(service).toBeTruthy();
  });
});
