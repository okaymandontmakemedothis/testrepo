import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushToolParameterComponent } from './brush-tool-parameter.component';

describe('BrushToolParameterComponent', () => {
  let component: BrushToolParameterComponent;
  let fixture: ComponentFixture<BrushToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushToolParameterComponent ],
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
