import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent implements OnInit {

  @Input()
  rgb: FormGroup;

  @Input()
  a: FormControl;

  rgbString = 'rgb(0,0,0,1)';

  ngOnInit(): void {
    this.rgb.valueChanges.subscribe((value) => {
      this.rgbString = this.getRGBString();
    });
  }

  getRGBString(): string {
    const r = this.rgb.get('r') as FormControl;
    const g = this.rgb.get('g') as FormControl;
    const b = this.rgb.get('b') as FormControl;
    return 'rgb(' + r.value + ',' + g.value + ',' + b.value + ')';
  }

}
