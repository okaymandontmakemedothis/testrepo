import { TestBed } from '@angular/core/testing';

import { ToolsColorService } from './tools-color.service';

describe('ToolsColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsColorService = TestBed.get(ToolsColorService);
    expect(service).toBeTruthy();
  });
});
