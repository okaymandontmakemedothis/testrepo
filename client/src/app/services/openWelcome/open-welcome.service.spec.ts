import { TestBed } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from 'src/app/components/welcome-dialog/welcome-dialog.module';
import { WelcomeDialogService } from '../welcome-dialog/welcome-dialog.service';
import { OpenWelcomeService } from './open-welcome.service';
import { HttpClientModule } from '@angular/common/http';
//import { FormGroup, FormControl } from '@angular/forms';

describe('OpenWelcomeService', () => {
  const welcomeDialogService: WelcomeDialogService = new WelcomeDialogService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule ],
      providers: [OpenWelcomeService, { provide: MatDialogRef, useValue: {} },
        { provide: WelcomeDialogService, useValue: welcomeDialogService }],
    });
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

  it(`should call on openDialog il message Activated is true'`, () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    //const form: FormGroup = new FormGroup({messageActivated: new FormControl(true) });
    welcomeDialogService.messageActivated.setValue(true);
    const dialogSpy = spyOn(service, 'openDialog').and.callThrough();
    service.openOnStart();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it(`should not call on openDialog il message Activated is false'`, () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    //const form: FormGroup = new FormGroup({ messageActivated: new FormControl(false) });
    const dialogSpy = spyOn(service, 'openDialog').and.callThrough();
    service.openOnStart();
    expect(dialogSpy).not.toHaveBeenCalled();
  });

});
