import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolIconComponent } from './tool-icon.component';

describe('ToolIconComponent', () => {
  let component: ToolIconComponent;
  let fixture: ComponentFixture<ToolIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
