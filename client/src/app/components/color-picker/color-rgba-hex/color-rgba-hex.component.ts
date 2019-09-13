import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-color-rgba-hex',
  templateUrl: './color-rgba-hex.component.html',
  styleUrls: ['./color-rgba-hex.component.scss'],
})
export class ColorRgbaHexComponent implements OnChanges, OnInit {

  @Input()
  hsla: { h: number, s: number, l: number, a: number } = { h: 180, s: 1, l: 1, a: 1 };

  rgba: { r: number, g: number, b: number, a: number } = { r: 255, g: 255, b: 255, a: 1 };

  hex: number;

  @Output()
  color: EventEmitter<{ hsl: { h: number, s: number, l: number }, a: number }> = new EventEmitter(true);

  private RGBaTohsla(rgba: { r: number, g: number, b: number, a: number }): { h: number, s: number, l: number, a: number } {
    const r = rgba.r / 255; const g = rgba.g / 255; const b = rgba.b / 255;

    const max = Math.max(r, g, b); const min = Math.min(r, g, b);
    let h = (max + min) / 2; let s = (max + min) / 2; const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return { h, s, l, a: rgba.a };
  }

  private hslaToRGBa(hsla: { h: number, s: number, l: number, a: number }): { r: number, g: number, b: number, a: number } {
    while (hsla.h >= 360) {
      hsla.h -= 360;
    }
    const h = hsla.h / 360;
    const q = hsla.l < 0.5 ? hsla.l * (1 + hsla.s) : hsla.l + hsla.s - hsla.l * hsla.s;
    const p = 2 * hsla.l - q;

    return {
      r: Math.round(this.hueToRGB(p, q, h + 1 / 3) * 255), g: Math.round(this.hueToRGB(p, q, h) * 255),
      b: Math.round((this.hueToRGB(p, q, h - 1 / 3) * 255)), a: hsla.a,
    };

  }

  private hueToRGB(p: number, q: number, t: number): number {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1 / 6) { return p + (q - p) * 6 * t; }
    if (t < 1 / 2) { return q; }
    if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
    return p;
  }

  ngOnInit(): void {
    this.rgba = this.hslaToRGBa(this.hsla);
    this.hex = this.rgba.r * (16 * 16 * 16 * 16) + this.rgba.g * 16 * 16 + this.rgba.b;
  }

  changeRGB() {
    this.hsla = this.RGBaTohsla(this.rgba);
    this.color.emit({ hsl: { h: this.hsla.h, s: this.hsla.s, l: this.hsla.l }, a: this.hsla.a });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rgba) {
      this.changeRGB();
    }
    if (changes.hsla) {
      this.rgba = this.hslaToRGBa(this.hsla);
      this.hex = this.rgba.r * (16 * 16 * 16 * 16) + this.rgba.g * 16 * 16 + this.rgba.b;
    }
  }
}
