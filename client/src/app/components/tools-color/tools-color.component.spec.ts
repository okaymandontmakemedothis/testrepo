import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsColorComponent } from './tools-color.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ToolsColorComponent', () => {
  let component: ToolsColorComponent;
  let fixture: ComponentFixture<ToolsColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsColorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
