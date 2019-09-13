import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersmenuComponent } from './parametersmenu.component';

describe('ParametersmenuComponent', () => {
  let component: ParametersmenuComponent;
  let fixture: ComponentFixture<ParametersmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
