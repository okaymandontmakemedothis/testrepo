import { RGBA } from '../model/rgba.model';
import { TEXTURE_THREE } from './texture-id';
import { TextureThree } from './texture3';

describe('BrushToolService', () => {
    let textureThree: TextureThree;
    const id = 2;
    beforeEach(() => {
        textureThree = new TextureThree();
    });

    it('should be created', () => {
        expect(textureThree).toBeTruthy();
    });

    it('should return it id', () => {
        const idName: string = textureThree.getTextureIDName(2);
        expect(idName).toBe(TEXTURE_THREE + '-2');
    });

    it('should return the patern', () => {

        const idName: string = textureThree.getTextureIDName(id);
        const rgba: RGBA = { rgb: { r: 200, g: 123, b: 200 }, a: 1 };
        const x = 20;
        const y = 25;
        const patternString = `<defs>
<pattern id="${idName}" width="15px" height="8px" viewBox="0 0 20 12" x="${x}" y="${y}"
 patternTransform="rotate(${textureThree.randomAngle})" patternUnits="userSpaceOnUse">
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="eyes" fill="rgb(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b})"
 fill-opacity="${rgba.a}">
<path d="M6,12 C6,11.3784524 5.90549098,10.7789786 5.73005951,10.2151652 C6.81793291,11.3170865
    8.32921496,12 10,12 C11.670785,12 13.1820671,11.3170865 14.2699405,10.2151652 C14.094509,10.7789786
    14,11.3784524 14,12 L16,12 C16,9.790861 17.790861,8 20,8 L20,6 C18.329215,6 16.8179329,6.68291349
    15.7300595,7.78483481 C15.905491,7.22102135 16,6.62154756 16,6 C16,5.37845244 15.905491,4.77897865
    15.7300595,4.21516519 C16.8179329,5.31708651 18.329215,6 20,6 L20,4 C17.790861,4 16,2.209139 16,0
    L14,0 C14,0.621547559 14.094509,1.22102135 14.2699405,1.78483481 C13.1820671,0.682913489 11.670785,0
    10,0 C8.32921496,0 6.81793291,0.682913489 5.73005951,1.78483481 C5.90549098,1.22102135 6,0.621547559
    6,0 L4,0 C4,2.209139 2.209139,4 0,4 L0,6 C1.67078504,6 3.18206709,6.68291349 4.26994049,7.78483481
    C4.09450902,7.22102135 4,6.62154756 4,6 C4,5.37845244 4.09450902,4.77897865 4.26994049,4.21516519
    C3.18206709,5.31708651 1.67078504,6 0,6 L0,8 C2.209139,8 4,9.790861 4,12 L6,12 L6,12 Z M2,12 C2,10.8954305
    1.1045695,10 0,10 L0,12 L2,12 L2,12 Z M18,12 C18,10.8954305 18.8954305,10 20,10 L20,12 L18,12 L18,12 Z M0,2
    C1.1045695,2 2,1.1045695 2,0 L0,0 L0,2 L0,2 Z M20,2 C18.8954305,2 18,1.1045695 18,0 L20,0 L20,2 L20,2 Z4
    M10,10 C12.209139,10 14,8.209139 14,6 C14,3.790861 12.209139,2 10,2 C7.790861,2 6,3.790861 6,6 C6,8.209139
    7.790861,10 10,10 L10,10 Z M10,8 C11.1045695,8 12,7.1045695 12,6 C12,4.8954305 11.1045695,4 10,4
    C8.8954305,4 8,4.8954305 8,6 C8,7.1045695 8.8954305,8 10,8 L10,8 Z" id="Combined-Shape"></path>
</g>
</g>
</pattern>
</defs>`;
        expect(textureThree.getPattern(rgba, rgba, id, x, y)).toBe(patternString);
    });

    it('should return null for the filter', () => {
        expect(textureThree.getFilter(id)).toBeNull();
    });
});