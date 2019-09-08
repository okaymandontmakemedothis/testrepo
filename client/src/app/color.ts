export class Color {

    constructor(colorValue: number) { };

    static colorWithHex(hex: number): Color {
        return new Color(hex);
    }

    static colorWithRGBA(r: number, g: number, b: number, a: number) {
        const hex = (r.toString(16).toString() + g.toString(16).toString() + b.toString(16).toString() + a.toString(16).toString());
        return new Color(+hex);
    }
}
