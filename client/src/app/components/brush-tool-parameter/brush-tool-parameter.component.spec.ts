import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushToolParameterComponent } from './brush-tool-parameter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('BrushToolParameterComponent', () => {
  let component: BrushToolParameterComponent;
  let fixture: ComponentFixture<BrushToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrushToolParameterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
