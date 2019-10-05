import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtampeToolParameterComponent } from './etampe-tool-parameter.component';

describe('EtampeToolParameterComponent', () => {
  let component: EtampeToolParameterComponent;
  let fixture: ComponentFixture<EtampeToolParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtampeToolParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtampeToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
