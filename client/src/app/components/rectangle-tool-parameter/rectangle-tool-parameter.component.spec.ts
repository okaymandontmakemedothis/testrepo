import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleToolParameterComponent } from './rectangle-tool-parameter.component';

describe('RectangleToolParameterComponent', () => {
  let component: RectangleToolParameterComponent;
  let fixture: ComponentFixture<RectangleToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleToolParameterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
