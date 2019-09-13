import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  @Input()
  rgb: FormGroup;

  @Input()
  a: FormControl;

  colorForm: FormGroup;

  ngOnInit(): void {
    this.colorForm = new FormGroup({
      hsl: new FormGroup({
        h: new FormControl(180),
        s: new FormControl(1),
        l: new FormControl(1),
      }),
      rgb: this.rgb,
      a: this.a,
    });
  }

  get hsl(): FormGroup {
    return this.colorForm.get('hsl') as FormGroup;
  }
}
