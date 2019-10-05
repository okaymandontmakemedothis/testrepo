import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from '../../app-material.module';
import { AppComponent } from './app.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
//import { WelcomeDialogService } from 'src/app/services/welcome-dialog/welcome-dialog.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  //let welcomeServiceSpy: jasmine.SpyObj<WelcomeDialogService>;

  // let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    //const spyWelcome = jasmine.createSpyObj('WelcomeDialogService', ['']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,

      ],

      providers: [
        //{ provide: WelcomeDialogService, useValue: spyWelcome },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    //welcomeServiceSpy = TestBed.get(WelcomeDialogService);
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog on openDialog', () => {
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  /*it('should create the app', () => {
    welcomeServiceSpy.form.setValue({ messageActivated: false });
    const spy = spyOn(component, 'openDialog');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });*/
});
