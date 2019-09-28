import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RectangleToolParameterComponent } from './rectangle-tool-parameter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolRectangleService } from 'src/app/services/tools/tool-rectangle/tool-rectangle.service';

describe('RectangleToolParameterComponent', () => {
  let component: RectangleToolParameterComponent;
  let fixture: ComponentFixture<RectangleToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleToolParameterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
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

  it('should patch rect value in form', () => {
    component.form = new FormGroup({ rectStyle: new FormControl('fill') });
    const spy = spyOn(component.form, 'patchValue').and.callThrough();
    component.selectStyle(1);
    expect(spy).toHaveBeenCalled();
  });
});
