import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyParameterComponent } from './empty-parameter.component';

describe('EmptyParameterComponent', () => {
  let component: EmptyParameterComponent;
  let fixture: ComponentFixture<EmptyParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyParameterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
