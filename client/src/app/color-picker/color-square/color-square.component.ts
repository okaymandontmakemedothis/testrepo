import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';

@Component({
  selector: 'app-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent implements OnInit {

  rgbString = 'rgb(0,0,0)';

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.rgb.valueChanges.subscribe((value) => {
      this.rgbString = this.colorPickerService.getRGBString();
    });
  }

  get rgb(): FormGroup {
    return this.colorPickerService.rgb;
  }

  get a(): FormControl {
    return this.colorPickerService.a;
  }
}