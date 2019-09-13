export class ColorTransformer {
    static rgb2hsl(rgb: { r: number, g: number, b: number }): { h: number, s: number, l: number } {
        const r = rgb.r / 255; const g = rgb.g / 255; const b = rgb.b / 255;

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

        return { h, s, l };
    }

    static hsl2rgb(hsla: { h: number, s: number, l: number }): { r: number, g: number, b: number } {
        while (hsla.h >= 360) {
            hsla.h -= 360;
        }
        const h = hsla.h / 360;
        const q = hsla.l < 0.5 ? hsla.l * (1 + hsla.s) : hsla.l + hsla.s - hsla.l * hsla.s;
        const p = 2 * hsla.l - q;
        const r = Math.round(this.pqt2rgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(this.pqt2rgb(p, q, h) * 255);
        const b = Math.round((this.pqt2rgb(p, q, h - 1 / 3) * 255));

        return { r, g, b };

    }

    private static pqt2rgb(p: number, q: number, t: number): number {
        if (t < 0) { t += 1; }
        if (t > 1) { t -= 1; }
        if (t < 1 / 6) { return p + (q - p) * 6 * t; }
        if (t < 1 / 2) { return q; }
        if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
        return p;
    }

    static hue2rgb(hue: number): { r: number, g: number, b: number } {
        while (hue >= 360) {
            hue -= 360;
        }
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
