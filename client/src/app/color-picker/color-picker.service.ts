import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RGB } from 'src/app/model/rgb.model';
import { HSL } from '../model/hsl.model';
import { ColorTransformerService } from '../services/color-transformer/color-transformer.service';

@Injectable(
  { providedIn: 'root' },
)
export class ColorPickerService {

  colorForm: FormGroup;
  rgb: FormGroup;
  hsl: FormGroup;
  a: FormControl;
  hex: FormControl;

  private formBuilder: FormBuilder;
  private rgbValueChangeSub: Subscription;
  private hslValueChangeSub: Subscription;
  private hexValueChangeSub: Subscription;

  constructor(private colorTransformerService: ColorTransformerService) {
    this.formBuilder = new FormBuilder();
    this.rgb = this.formBuilder.group({
      r: 255,
      g: 255,
      b: 255,
    });
    this.hsl = this.formBuilder.group({
      h: 180,
      s: 1,
      l: 1,
    });
    this.a = this.formBuilder.control(1);
    this.hex = this.formBuilder.control('#ffffff');
    this.colorForm = this.formBuilder.group({
      hsl: this.hsl,
      rgb: this.rgb,
      a: this.a,
      hex: this.hex,
    });
    this.setHSLSubscribe();
    this.setRGBSubscribe();
    this.setHEXSubscribe();
  }

  private setHSLSubscribe(): void {
    this.hslValueChangeSub = this.hsl.valueChanges.subscribe((hsl: HSL) => {
      this.rgbValueChangeSub.unsubscribe();
      this.hexValueChangeSub.unsubscribe();
      this.rgb.setValue(this.colorTransformerService.hsl2rgb(hsl));
      this.hex.setValue(this.colorTransformerService.hsl2hex(hsl));
      this.setRGBSubscribe();
      this.setHEXSubscribe();
    });
  }

  private setRGBSubscribe(): void {
    this.rgbValueChangeSub = this.rgb.valueChanges.subscribe((rgb: RGB) => {
      this.hslValueChangeSub.unsubscribe();
      this.hexValueChangeSub.unsubscribe();
      this.hsl.setValue(this.colorTransformerService.rgb2hsl(rgb));
      this.hex.setValue(this.colorTransformerService.rgb2hex(rgb));
      this.setHSLSubscribe();
      this.setHEXSubscribe();
    });
  }

  private setHEXSubscribe(): void {
    this.hexValueChangeSub = this.hex.valueChanges.subscribe((hex: string) => {
      this.rgbValueChangeSub.unsubscribe();
      this.hslValueChangeSub.unsubscribe();
      this.hsl.setValue(this.colorTransformerService.hex2hsl(hex));
      this.rgb.setValue(this.colorTransformerService.hex2rgb(hex));
      this.setHSLSubscribe();
      this.setRGBSubscribe();
    });
  }

  setFormColor(rgb: RGB, a: number) {
    this.rgb.setValue(rgb);
    this.a.setValue(a);
  }
}
