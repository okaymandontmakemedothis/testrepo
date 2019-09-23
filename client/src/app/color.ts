import { ColorError } from './color-error';
export class Color {

    constructor(public r: number, public g: number, public b: number, public colorOpacity: number = 1) { }

    static colorWithHex(hex: number): Color {
        this.validateHex(hex);
        const hexString = hex.toString(16);
        return new Color(+('0x' + hexString.substr(0, 2)), +('0x' + hexString.substr(2, 2)), +('0x' + hexString.substr(4, 2)));
    }

    static colorWithRGBA(r: number, g: number, b: number, a: number) {
        this.validateRGBA(r, g, b, a);
        return new Color(r, g, b, a);
    }

    private static validateRGBA(r: number, g: number, b: number, a: number) {
        if (r > 255 || r < 0) {
            throw new ColorError(r + ' is bad');
        }

        if (g > 255 || g < 0) {
            throw new ColorError(g + ' is bad');
        }
        if (b > 255 || b < 0) {
            throw new ColorError(b + ' is bad');
        }

        if (a > 1 || a < 0) {
            throw new ColorError(a + ' is bad');
        }
    }

    private static validateHex(hex: number) {
        const hexString = hex.toString();
        if (hexString.length !== 6) {
            throw new ColorError('Your number must have 6 digits');
        }
    }
}
