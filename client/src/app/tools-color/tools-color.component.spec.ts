import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsColorComponent } from './tools-color.component';

describe('ToolsColorComponent', () => {
  let component: ToolsColorComponent;
  let fixture: ComponentFixture<ToolsColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsColorComponent ]
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
