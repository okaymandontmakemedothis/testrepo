import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';

@Component({
  selector: 'app-color-rgba-hex',
  templateUrl: './color-rgba-hex.component.html',
  styleUrls: ['./color-rgba-hex.component.scss'],
})
export class ColorRgbaHexComponent implements OnInit {

  colorForm: FormGroup;

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.colorForm = this.colorPickerService.colorForm;
  }

  get rgb(): FormGroup {
    return this.colorPickerService.rgb;
  }

  get hsl(): FormGroup {
    return this.colorPickerService.hsl;
  }
}
