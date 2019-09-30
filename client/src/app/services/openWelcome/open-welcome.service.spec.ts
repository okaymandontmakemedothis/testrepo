import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { of } from 'rxjs';
import { WelcomeDialogService } from '../welcome-dialog.service';
import { OpenWelcomeService } from './open-welcome.service';

describe('OpenWelcomeService', () => {
  let openService: OpenWelcomeService;
  const welcomeDialogService: WelcomeDialogService = new WelcomeDialogService();
  //const mockDialogRef = { open: jasmine.createSpy('open') };
  // let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [OpenWelcomeService, { provide: MatDialogRef, useValue: {} },
        { provide: WelcomeDialogService, useValue: welcomeDialogService }],
    });
    openService = TestBed.get(openService);
  });

  it('service should be created', () => {
    const service: OpenWelcomeService = TestBed.get(OpenWelcomeService);
    expect(service).toBeTruthy();
  });

  it(`should call on openDialog when initially opened'`, () => {
    const dialogSpy =  spyOn(TestBed.get(MatDialog), 'openDialog').and.callThrough();
    openService.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

});
