import { TestBed } from '@angular/core/testing';

import { ErrorMessageService } from './error-message.service';
import { MatDialogModule } from '@angular/material';

describe('ErrorMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[MatDialogModule]

  }));

  it('should be created', () => {
    const service: ErrorMessageService = TestBed.get(ErrorMessageService);
    expect(service).toBeTruthy();
  });
});
