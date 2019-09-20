/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SelectToolService } from './select-tool.service';

describe('Service: SelectTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectToolService]
    });
  });

  it('should ...', inject([SelectToolService], (service: SelectToolService) => {
    expect(service).toBeTruthy();
  }));
});
