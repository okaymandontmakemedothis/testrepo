import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AideDialogComponent } from './aide-dialog.component';

describe('AideDialogComponent', () => {
  let component: AideDialogComponent;
  let fixture: ComponentFixture<AideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AideDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
