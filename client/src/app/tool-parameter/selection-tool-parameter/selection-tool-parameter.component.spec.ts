import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionToolParameterComponent } from './selection-tool-parameter.component';

describe('SelectionToolParameterComponent', () => {
  let component: SelectionToolParameterComponent;
  let fixture: ComponentFixture<SelectionToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionToolParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
