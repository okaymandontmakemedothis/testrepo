import { TestBed } from '@angular/core/testing';

import { ToolsListService } from './tools-list.service';

describe('ToolsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsListService = TestBed.get(ToolsListService);
    expect(service).toBeTruthy();
  });
});
