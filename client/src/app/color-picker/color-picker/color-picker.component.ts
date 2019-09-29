import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { RGB } from 'src/app/model/rgb.model';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  colorForm: FormGroup;

  constructor(private colorPickerService: ColorPickerService) {

  }

  ngOnInit(): void {
    this.colorForm = this.colorPickerService.colorForm;
  }

  get a() {
    return this.colorPickerService.a.value;
  }

  get rgb() {
    const r = (this.colorPickerService.rgb.get('r') as FormControl).value;
    const g = (this.colorPickerService.rgb.get('g') as FormControl).value;
    const b = (this.colorPickerService.rgb.get('b') as FormControl).value;
    return { r, g, b };
  }

  resetForm() {
    this.colorForm.reset();
  }

  setFormColor(rgb: RGB, a: number) {
    this.colorPickerService.setFormColor(rgb, a);
  }
}
