import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineToolParameterComponent } from './line-tool-parameter.component';

describe('LineToolParameterComponent', () => {
  let component: LineToolParameterComponent;
  let fixture: ComponentFixture<LineToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineToolParameterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
