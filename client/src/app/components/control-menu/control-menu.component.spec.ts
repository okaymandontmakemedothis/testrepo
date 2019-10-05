import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { ControlMenuComponent } from './control-menu.component';

describe('ControlMenuComponent', () => {
  let component: ControlMenuComponent;
  let fixture: ComponentFixture<ControlMenuComponent>;

  // let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlMenuComponent],
      imports: [MaterialModules, BrowserAnimationsModule],
      providers: [ControlMenuComponent, { provide: MatDialogRef, useValue: {} },],
    });
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openWelcomeMessage() when button is clicked', fakeAsync(() => {
    spyOn(component, 'openWelcomeMessage').and.callThrough();
    const welcomeButton = fixture.debugElement.query(By.css('button[id=welcome]'));
    welcomeButton.triggerEventHandler('click', null);
    expect(component.openWelcomeMessage).toHaveBeenCalled();
  }));

  it('should call openNewDrawing() when button is clicked', fakeAsync(() => {
    spyOn(component, 'openNewDrawing').and.callThrough();
    const drawingButton = fixture.debugElement.query(By.css('button[id=drawing]'));
    drawingButton.triggerEventHandler('click', null);
    expect(component.openNewDrawing).toHaveBeenCalled();
  }));
});
