import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDialogComponent } from './welcome-dialog.component';
import { MatDialog } from '@angular/material';

describe('WelcomeDialogComponent', () => {
  let component: WelcomeDialogComponent;
  let fixture: ComponentFixture<WelcomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeDialogComponent ],
      imports:[MatDialog]
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


});

