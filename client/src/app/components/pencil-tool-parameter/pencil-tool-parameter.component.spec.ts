import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PencilToolParameterComponent } from './pencil-tool-parameter.component';

describe('PencilToolParameterComponent', () => {
  let component: PencilToolParameterComponent;
  let fixture: ComponentFixture<PencilToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PencilToolParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencilToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
