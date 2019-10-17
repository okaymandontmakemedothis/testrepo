// import { Renderer2 } from '@angular/core';
// import { RGBA } from '../model/rgba.model';
import { TEXTURE_ONE } from './texture-id';
import { TextureOne } from './texture1';

describe('BrushToolService', () => {
    let textureOne: TextureOne;
    // const id = '2';
    beforeEach(() => {
        textureOne = new TextureOne();
    });

    it('should be created', () => {
        expect(textureOne).toBeTruthy();
    });

    it('should return it id', () => {
        const idName: string = textureOne.getTextureIDName('2');
        expect(idName).toBe(TEXTURE_ONE + '-2');
    });

    it('should return the patern', () => {

        //         const idName: string = textureOne.getTextureIDName(id);
        //         const rgba: RGBA = { rgb: { r: 200, g: 123, b: 200 }, a: 1 };
        //         const x = 20;
        //         const y = 25;
        //         const patternString = `<defs>
        // <pattern id="${idName}" width="12" height="24" viewBox="0 0 12 24" x="${x}" y="${y}"
        //  patternTransform="rotate(${textureOne.randomAngle})" patternUnits="userSpaceOnUse">
        // <g fill="none" fill-rule="evenodd">
        // <g fill="rgb(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b})"
        //  fill-opacity="${rgba.a}">
        // <path d="M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105
        //  0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z"/>
        // </g>
        // </g>
        // </pattern>
        // </defs>`;
        //         expect(textureOne.getPattern(rgba, id, x, y, Renderer2.prototype)).toBe(patternString);
    });
});
