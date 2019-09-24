<<<<<<< HEAD
import {HttpClientModule} from '@angular/common/http';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> master
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from '../welcome-dialog/welcome-dialog.module';
import { MaterialModules } from './../../app.material-modules';
<<<<<<< HEAD
import {AppComponent} from './app.component';
=======
import { AppComponent } from './app.component';
>>>>>>> master

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
