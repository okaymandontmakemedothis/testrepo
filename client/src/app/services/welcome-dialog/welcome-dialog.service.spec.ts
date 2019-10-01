import { TestBed } from '@angular/core/testing';

import { WelcomeDialogService } from './welcome-dialog.service';

describe('WelcomeDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('service should be created', () => {
    const service: WelcomeDialogService = TestBed.get(WelcomeDialogService);
    expect(service).toBeTruthy();
  });

  it('form should be created ', () => {
    const service: WelcomeDialogService = TestBed.get(WelcomeDialogService);
    expect(service.form.get('messageActivated')).toBeTruthy();
  });

});
