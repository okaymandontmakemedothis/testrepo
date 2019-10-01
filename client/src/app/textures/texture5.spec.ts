import { RGBA } from '../model/rgba.model';
import { TEXTURE_FIVE } from './texture-id';
import { TextureFive } from './texture5';

describe('BrushToolService', () => {
    let textureFive: TextureFive;
    const id = 2;
    beforeEach(() => {
        textureFive = new TextureFive();
    });

    it('should be created', () => {
        expect(textureFive).toBeTruthy();
    });

    it('should return it id', () => {
        const idName: string = textureFive.getTextureIDName(2);
        expect(idName).toBe(TEXTURE_FIVE + '-2');
    });

    it('should return the patern', () => {

        const idName: string = textureFive.getTextureIDName(id);
        const rgba: RGBA = { rgb: { r: 200, g: 123, b: 200 }, a: 1 };
        const x = 20;
        const y = 25;
        const patternString = `<defs>
 <pattern id="${idName}" viewBox="0,0,4,4" width="4" height="4" x="${x}" y="${y}"
 patternTransform="rotate(${textureFive.randomAngle})" patternUnits="userSpaceOnUse">
 <path fill="rgb(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b})" fill-opacity="primaryColor.a"
 d="M1 3h1v1H1V3zm2-2h1v1H3V1z"></path>
 </pattern>
</defs>`;
        expect(textureFive.getPattern(rgba, rgba, id, x, y)).toBe(patternString);
    });

    it('should return null for the filter', () => {
        expect(textureFive.getFilter(id)).toBeNull();
    });
});
