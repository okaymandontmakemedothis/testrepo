import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDialogComponent } from './welcome-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

describe('WelcomeDialogComponent', () => {
  let component: WelcomeDialogComponent;
  let fixture: ComponentFixture<WelcomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialog,
        MatDialogRef,
      ],
      declarations: [ WelcomeDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on openDialog when initially opened', () => {
    spyOn(component, 'openDialog');
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalled();
  });
});

