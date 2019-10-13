import { Renderer2 } from '@angular/core';
import { RGBA } from '../model/rgba.model';

export interface ITexture {
    readonly id: number;
    readonly name: string;
    getTextureIDName(id: number): string;
    getPattern(primaryColor: RGBA, secondaryColor: RGBA, id: number, x: number, y: number, renderer: Renderer2): SVGDefsElement;
}
