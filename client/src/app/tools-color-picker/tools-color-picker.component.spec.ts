import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsColorPickerComponent } from './tools-color-picker.component';

describe('ToolsColorPickerComponent', () => {
  let component: ToolsColorPickerComponent;
  let fixture: ComponentFixture<ToolsColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
