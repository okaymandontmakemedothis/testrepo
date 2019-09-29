import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogComponent } from './welcome-dialog.component';
import { WelcomeDialogModule } from './welcome-dialog.module';


describe('WelcomeDialogComponent', () => {
  let component: WelcomeDialogComponent;
  let fixture: ComponentFixture<WelcomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule,
      ],
    })
      .compileComponents();
  }));

  it('should create welcome-dialog', () => {
    fixture = TestBed.createComponent(WelcomeDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should call on openDialog when initially opened'`, () => {
    fixture = TestBed.createComponent(WelcomeDialogComponent);
    component = fixture.componentInstance;
    const spy = spyOn(component, 'openDialog').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});