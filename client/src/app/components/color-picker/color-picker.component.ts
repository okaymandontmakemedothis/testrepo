import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  colorForm: FormGroup;

  ngOnInit(): void {
    this.colorForm = new FormGroup({
      hsl: new FormGroup({
        h: new FormControl(180),
        s: new FormControl(1),
        l: new FormControl(1),
      }),
      rgb: new FormGroup({
        r: new FormControl(255),
        g: new FormControl(255),
        b: new FormControl(255),
      }),
      a: new FormControl(1),
    });
  }

  get hsl(): FormGroup {
    return this.colorForm.get('hsl') as FormGroup;
  }

  get rgb(): FormGroup {
    return this.colorForm.get('rgb') as FormGroup;
  }
}
