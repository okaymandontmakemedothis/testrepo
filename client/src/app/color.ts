export class ColorError extends Error{
    constructor (message: string) {
        super(message);  
    }
}

export class Color {

    constructor(public colorValue: number, colorOpacity: number = 1) {
     };

    static colorWithHex(hex: number): Color {
        this.validateHex(hex);
        return new Color(hex);
    }

    static colorWithRGBA(r: number, g: number, b: number, a: number) {
        this.validateRGBA(r,g,b,a);

        let hex: string = '0x';

        if(r < 16)
            hex += '0' + r.toString(16).toString();
        else
            hex += r.toString(16).toString();

        if(g < 16)
            hex += '0' + g.toString(16).toString();
        else
            hex += g.toString(16).toString();

        if(b < 16)
            hex += '0' + b.toString(16).toString();
        else
            hex += b.toString(16).toString();
            
        return new Color(+hex, a);
    }

    private static validateRGBA(r: number, g: number, b: number, a: number){
        if (r > 255 || r < 0)
            throw new ColorError(r + " is bad");

        if (g > 255 || r < 0)
            throw new ColorError(r + "too high");

        if (b > 255 || r < 0)
            throw new ColorError(r + "too high");

        if (a > 1 || r < 0)
            throw new ColorError(r + "too high");
    }

    private static validateHex(hex: number){
        let hexString = hex.toString();
        if (hexString.length != 8)
            throw new ColorError('Your number must have 6 digits');
    }
}
