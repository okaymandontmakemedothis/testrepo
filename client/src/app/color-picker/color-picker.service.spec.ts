import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorPickerService } from './color-picker.service';

describe('ColorPickerService', () => {
  let service: ColorPickerService;
  beforeEach(() => {
    service = TestBed.get(ColorPickerService);
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#rgb should return rgb group', () => {
    const rgb: FormGroup = service.rgb;
    expect((rgb.get('r') as FormControl).value).toBe(255);
    expect((rgb.get('g') as FormControl).value).toBe(255);
    expect((rgb.get('b') as FormControl).value).toBe(255);
  });
});
