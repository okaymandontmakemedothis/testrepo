import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDrawingFormComponent } from './new-drawing-form.component';

describe('NewDrawingFormComponent', () => {
  let component: NewDrawingFormComponent;
  let fixture: ComponentFixture<NewDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
