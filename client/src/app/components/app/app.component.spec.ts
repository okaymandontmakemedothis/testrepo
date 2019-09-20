import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {IndexService} from '../../services/index/index.service';
import SpyObj = jasmine.SpyObj;
import { WelcomeDialogModule } from '../welcome-dialog/welcome-dialog.module';
import { MaterialModules } from './../../app.material-modules';
import {AppComponent} from './app.component';

import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

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
