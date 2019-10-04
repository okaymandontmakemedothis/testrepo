import { Injectable } from '@angular/core';
import { HSL, MAX_HUE, MAX_LIGHTNESS, MAX_SATURATION } from 'src/app/model/hsl.model';
import { RGB, RGB_MAX_VALUE } from 'src/app/model/rgb.model';

/// Service qui permet de faire la conversion entre les differente forme de couleur
/// Supporte RGB, HSL, HEX, HUE

@Injectable({
  providedIn: 'root',
})
export class ColorTransformerService {
  /// Transforme une valeur RGB en valeur HSL
  rgb2hsl(rgb: RGB): HSL {
    if (rgb.r > RGB_MAX_VALUE) {
      rgb.r = RGB_MAX_VALUE;
    }
    if (rgb.r < 0) {
      rgb.r = 0;
    }
    if (rgb.g > RGB_MAX_VALUE) {
      rgb.g = RGB_MAX_VALUE;
    }
    if (rgb.g < 0) {
      rgb.g = 0;
    }
    if (rgb.b > RGB_MAX_VALUE) {
      rgb.b = RGB_MAX_VALUE;
    }
    if (rgb.b < 0) {
      rgb.b = 0;
    }

    const r = rgb.r / RGB_MAX_VALUE; const g = rgb.g / RGB_MAX_VALUE; const b = rgb.b / RGB_MAX_VALUE;

    const max = Math.max(r, g, b); const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0; let s = 0; let l = 0;

    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
      h = 360 + h;
    }

    l = Math.round(((max + min) / 2) * 1000) / 1000;

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = Math.round(s * 1000) / 1000;
    return { h, s, l };
  }

  /// Transforme une valeur RGB en valeur HEX
  rgb2hex(rgb: RGB): string {
    let r: string; let g: string; let b: string;
    if (rgb.r < 16) {
      r = '0' + rgb.r.toString(16);
    } else {
      r = rgb.r.toString(16);
    }
    if (rgb.g < 16) {
      g = '0' + rgb.g.toString(16);
    } else {
      g = rgb.g.toString(16);
    }
    if (rgb.b < 16) {
      b = '0' + rgb.b.toString(16);
    } else {
      b = rgb.b.toString(16);
    }
    return '#' + r + g + b;
  }

  /// Transforme une valeur HSL en valeur RGB
  hsl2rgb(hsl: HSL): RGB {
    if (hsl.l > MAX_LIGHTNESS) {
      hsl.l = MAX_LIGHTNESS;
    }
    if (hsl.l < 0) {
      hsl.l = 0;
    }
    if (hsl.s > MAX_SATURATION) {
      hsl.s = MAX_SATURATION;
    }
    if (hsl.s < 0) {
      hsl.s = 0;
    }
    if (hsl.h < 0) {
      hsl.h = 0;
    }
    if (hsl.h >= MAX_HUE) {
      hsl.h %= MAX_HUE;
    }

    const sixtOfMaxHue = MAX_HUE / 6;

    const c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
    const x = c * (1 - Math.abs((hsl.h / sixtOfMaxHue) % 2 - 1));
    const m = hsl.l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= hsl.h && hsl.h < sixtOfMaxHue) {
      r = c; g = x; b = 0;
    } else if (sixtOfMaxHue <= hsl.h && hsl.h < sixtOfMaxHue * 2) {
      r = x; g = c; b = 0;
    } else if (sixtOfMaxHue * 2 <= hsl.h && hsl.h < sixtOfMaxHue * 3) {
      r = 0; g = c; b = x;
    } else if (sixtOfMaxHue * 3 <= hsl.h && hsl.h < sixtOfMaxHue * 4) {
      r = 0; g = x; b = c;
    } else if (sixtOfMaxHue * 4 <= hsl.h && hsl.h < sixtOfMaxHue * 5) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * RGB_MAX_VALUE);
    g = Math.round((g + m) * RGB_MAX_VALUE);
    b = Math.round((b + m) * RGB_MAX_VALUE);

    return { r, g, b };
  }

  /// Transforme une valeur HSL en valeur HEX
  hsl2hex(hsl: HSL): string {
    return this.rgb2hex(this.hsl2rgb(hsl));
  }

  /// Transforme une valeur HEX en valeur RGB
  hex2rgb(hex: string): RGB {
    const result: RegExpExecArray | null = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
    if (result == null) {
      return { r: RGB_MAX_VALUE, g: RGB_MAX_VALUE, b: RGB_MAX_VALUE };
    }
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  /// Transforme une valeur HEX en valeur HSL
  hex2hsl(hex: string): HSL {
    return this.rgb2hsl(this.hex2rgb(hex));
  }

  /// Transforme une valeur HUE en valeur RGB
  hue2rgb(hue: number): RGB {
    return this.hsl2rgb(this.hue2hsl(hue));
  }

  /// Transforme une valeur HUE en valeur HEX
  hue2hex(hue: number): string {
    return this.hsl2hex(this.hue2hsl(hue));
  }

  /// Transforme une valeur HUE en valeur HSL
  hue2hsl(hue: number): HSL {
    return { h: hue, s: MAX_SATURATION, l: MAX_LIGHTNESS / 2 };
  }
}
