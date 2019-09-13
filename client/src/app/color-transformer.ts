export class ColorTransformer {
    static rgb2hsl(rgb: { r: number, g: number, b: number }): { h: number, s: number, l: number } {
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

        l = (max + min) / 2;

        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        return { h, s, l };
    }

    static hsl2rgb(hsl: { h: number, s: number, l: number }): { r: number, g: number, b: number } {
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

    static hue2rgb(hue: number): { r: number, g: number, b: number } {
        const x = 1 - Math.abs((hue / 60) % 2 - 1);
        const c = 1;
        let rgb = { r: 255, g: 255, b: 255 };
        if (0 <= hue && hue < 60) {
            rgb = { r: c, g: x, b: 0 };
        } else if (60 <= hue && hue < 120) {
            rgb = { r: x, g: c, b: 0 };
        } else if (120 <= hue && hue < 180) {
            rgb = { r: 0, g: c, b: x };
        } else if (180 <= hue && hue < 240) {
            rgb = { r: 0, g: x, b: c };
        } else if (240 <= hue && hue < 300) {
            rgb = { r: x, g: 0, b: c };
        } else if (300 <= hue && hue < 360) {
            rgb = { r: c, g: 0, b: x };
        }
        rgb.r = Math.round(rgb.r * 255); rgb.g = Math.round(rgb.g * 255); rgb.b = Math.round(rgb.b * 255);
        return rgb;
    }

    static hex2rgb(hex: string) {
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
}
