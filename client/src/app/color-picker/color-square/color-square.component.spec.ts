import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ColorSquareComponent } from './color-square.component';

describe('ColorSquareComponent', () => {
  let component: ColorSquareComponent;
  let fixture: ComponentFixture<ColorSquareComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSquareComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rgbString with default value', () => {
    expect(component.rgbString).toBe('rgb(0,0,0)');
  });

  it('rgbString after a value update', () => {
    //component.rgb.setValue({ r: 120, g: 40, b: 180 });
    expect(component.rgbString).toBe('rgb(120,40,180)');
  });
});
