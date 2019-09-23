import { Injectable } from '@angular/core';
import { RGB } from 'src/app/model/rgb.model';
import { HSL } from 'src/app/model/hsl.model';

@Injectable({
  providedIn: 'root',
})
export class ColorTransformerService {
  rgb2hsl(rgb: RGB): HSL {
    if (rgb.r > 255) {
      rgb.r = 255;
    }
    if (rgb.r < 0) {
      rgb.r = 0;
    }
    if (rgb.g > 255) {
      rgb.g = 255;
    }
    if (rgb.g < 0) {
      rgb.g = 0;
    }
    if (rgb.b > 255) {
      rgb.b = 255;
    }
    if (rgb.b < 0) {
      rgb.b = 0;
    }

    const r = rgb.r / 255; const g = rgb.g / 255; const b = rgb.b / 255;

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

  hsl2rgb(hsl: HSL): RGB {
    if (hsl.l > 1) {
      hsl.l = 1;
    }
    if (hsl.l < 0) {
      hsl.l = 0;
    }
    if (hsl.s > 1) {
      hsl.s = 1;
    }
    if (hsl.s < 0) {
      hsl.s = 0;
    }
    if (hsl.h < 0) {
      hsl.h = 0;
    }
    while (hsl.h >= 360) {
      hsl.h -= 360;
    }
    const c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
    const x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1));
    const m = hsl.l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= hsl.h && hsl.h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= hsl.h && hsl.h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= hsl.h && hsl.h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= hsl.h && hsl.h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= hsl.h && hsl.h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= hsl.h && hsl.h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };

  }

  hue2rgb(hue: number): RGB {
    return this.hsl2rgb({ h: hue, s: 1, l: 0.5 });
  }

  hex2rgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result == null) {
      return { r: 255, g: 255, b: 255 };
    }
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

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
}
