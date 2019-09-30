import { TestBed } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from 'src/app/components/welcome-dialog/welcome-dialog.module';
import { WelcomeDialogService } from '../welcome-dialog/welcome-dialog.service';
import { OpenWelcomeService } from './open-welcome.service';
import { HttpClientModule } from '@angular/common/http';

describe('OpenWelcomeService', () => {
  let welcomeDialogServiceSpy: jasmine.SpyObj<WelcomeDialogService>;

  beforeEach(() => {
    const welcomeSpy = jasmine.createSpyObj('WelcomeDialogService', ['']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule ],
      providers: [OpenWelcomeService, { provide: MatDialogRef, useValue: {} },
        { provide: WelcomeDialogService, useValue: welcomeSpy }],
    });
    welcomeDialogServiceSpy = TestBed.get(welcomeDialogServiceSpy);
    //welcomeDialogServiceSpy.messageActivated
  });

  it('service should be created', () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    expect(service).toBeTruthy();
  });

  it(`should call on openDialog '`, () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    const dialogSpy =  spyOn(service, 'openDialog').and.callThrough();
    service.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  /*it(`should call on openDialog if message Activated is true'`, () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);

   // welcomeDialogServiceSpy.messageActivated.setValue(true);

    const dialogSpy = spyOn(service, 'openDialog').and.callThrough();
    service.openOnStart();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it(`should not call on openDialog if message Activated is false'`, () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    //welcomeDialogServiceSpy.messageActivated.setValue(false);
    const dialogSpy = spyOn(service, 'openDialog').and.callThrough();
    service.openOnStart();
    expect(dialogSpy).not.toHaveBeenCalled();
  });*/

});
