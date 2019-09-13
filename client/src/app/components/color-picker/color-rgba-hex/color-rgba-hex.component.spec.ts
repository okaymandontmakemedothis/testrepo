import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRgbaHexComponent } from './color-rgba-hex.component';

describe('ColorRgbaHexComponent', () => {
  let component: ColorRgbaHexComponent;
  let fixture: ComponentFixture<ColorRgbaHexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorRgbaHexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorRgbaHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
