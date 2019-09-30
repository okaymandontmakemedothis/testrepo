import { TestBed } from '@angular/core/testing';
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
});
