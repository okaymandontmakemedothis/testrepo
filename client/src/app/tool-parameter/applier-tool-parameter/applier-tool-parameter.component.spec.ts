import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplierToolParameterComponent } from './applier-tool-parameter.component';

describe('ApplierToolParameterComponent', () => {
  let component: ApplierToolParameterComponent;
  let fixture: ComponentFixture<ApplierToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplierToolParameterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplierToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
