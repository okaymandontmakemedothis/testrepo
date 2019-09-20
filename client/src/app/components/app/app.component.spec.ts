import {HttpClientModule} from '@angular/common/http';
import {async, TestBed} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {IndexService} from '../../services/index/index.service';
import {AppComponent} from './app.component';
import SpyObj = jasmine.SpyObj;
import { WelcomeDialogModule } from '../welcome-dialog/welcome-dialog.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from './../../app.material-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('AppComponent', () => {
  let indexServiceSpy: SpyObj<IndexService>;

  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['basicGet']);
    indexServiceSpy.basicGet.and.returnValue(of({title: '', body: ''}));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModules,
        WelcomeDialogModule,
      ],
      declarations: [
        AppComponent,
      ],

      providers: [
        {provide: IndexService, useValue: indexServiceSpy},
      ],
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LOG2990'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('LOG2990');
  });
});
