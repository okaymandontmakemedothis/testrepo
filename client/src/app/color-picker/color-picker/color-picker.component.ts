import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/services/color-picker/color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [ColorPickerService],
})
export class ColorPickerComponent implements OnInit {

  colorForm: FormGroup;

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.colorForm = this.colorPickerService.colorForm;
  }

  get a(): FormControl {
    return this.colorPickerService.a;
  }

  get hsl(): FormGroup {
    return this.colorPickerService.hsl;
  }

  get rgb(): FormGroup {
    return this.colorPickerService.rgb;
  }
}
