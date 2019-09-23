import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';
import { ColorRgbaHexComponent } from './color-rgba-hex.component';

describe('ColorRgbaHexComponent', () => {
  let component: ColorRgbaHexComponent;
  let fixture: ComponentFixture<ColorRgbaHexComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorRgbaHexComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ColorTransformerService,
      ],
      providers: [
        { provide: ColorTransformerService, useClass: ColorTransformerService },
        { provide: FormBuilder, useValue: formBuilder },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorRgbaHexComponent);
    component = fixture.componentInstance;
    component.colorForm = formBuilder.group({
      hsl: formBuilder.group({
        h: 180,
        s: 1,
        l: 1,
      }),
      rgb: formBuilder.group({
        r: 0,
        g: 0,
        b: 0,
      }),
      a: 1,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
