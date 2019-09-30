import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from '../welcome-dialog/welcome-dialog.module';
import { MaterialModules } from './../../app.material-modules';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModules,
        WelcomeDialogModule,
      ],

      providers: [
        { provide: MatDialog, useValue: MatDialog },

      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});


// import { HttpClientModule } from '@angular/common/http';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { WelcomeDialogComponent } from './welcome-dialog.component';
// import { WelcomeDialogModule } from './welcome-dialog.module';


// describe('WelcomeDialogComponent', () => {
//   let component: WelcomeDialogComponent;
//   let fixture: ComponentFixture<WelcomeDialogComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule,
//       ],
//     })
//       .compileComponents();
//   }));

//   it('should create welcome-dialog', () => {
//     fixture = TestBed.createComponent(WelcomeDialogComponent);
//     component = fixture.componentInstance;
//     expect(component).toBeTruthy();
//   });

//   it(`should call on openDialog when initially opened'`, () => {
//     fixture = TestBed.createComponent(WelcomeDialogComponent);
//     component = fixture.componentInstance;
//     const spy = spyOn(component, 'openDialog').and.callThrough();
//     fixture.detectChanges();
//     expect(spy).toHaveBeenCalled();
//   });

// });