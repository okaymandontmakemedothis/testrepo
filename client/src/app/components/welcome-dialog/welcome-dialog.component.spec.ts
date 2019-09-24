import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material';
import { WelcomeDialogComponent } from './welcome-dialog.component';

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
