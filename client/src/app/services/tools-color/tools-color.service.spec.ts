import { TestBed } from '@angular/core/testing';

import { ToolsColorService } from './tools-color.service';

describe('ToolsColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsColorService = TestBed.get(ToolsColorService);
    expect(service).toBeTruthy();
    expect(service.lastSelectedColors.length).toEqual(10);
    expect(service.lastSelectedColors[9]).toEqual({ rgb: { r: 0, g: 0, b: 0 }, a: 1 });
  });
});
