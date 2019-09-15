import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterMenuComponent } from './parameter-menu.component';

describe('ParameterMenuComponent', () => {
  let component: ParameterMenuComponent;
  let fixture: ComponentFixture<ParameterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
