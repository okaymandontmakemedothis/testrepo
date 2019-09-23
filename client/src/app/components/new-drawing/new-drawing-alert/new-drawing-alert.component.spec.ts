import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDrawingAlertComponent } from './new-drawing-alert.component';

describe('NewDrawingAlertComponent', () => {
  let component: NewDrawingAlertComponent;
  let fixture: ComponentFixture<NewDrawingAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDrawingAlertComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
