import { TestBed } from '@angular/core/testing';

import { ToolPointerService } from './tool-pointer.service';

describe('ToolPointerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolPointerService = TestBed.get(ToolPointerService);
    expect(service).toBeTruthy();
  });
});
