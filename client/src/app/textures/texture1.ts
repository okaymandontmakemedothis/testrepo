import { Renderer2 } from '@angular/core';
import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_ONE } from './texture-id';

/// Classe avec les informations de la texture de texture one
/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureOne implements ITexture {
    readonly id: number = TEXTURE_ONE;
    readonly name = 'Texture One';
    readonly randomAngle = Math.round(Math.random() * 360);

    getTextureIDName(id: string): string {
        return `${this.id}-${id}`;
    }

    /// Retourne la ligne html du pattern
    getPattern(primaryColor: RGBA, id: string, x: number, y: number, renderer: Renderer2): SVGDefsElement {
        const texture: SVGDefsElement = renderer.createElement('defs', 'svg');
        renderer.setAttribute(texture, 'pointer-events', 'none');
        const pattern: SVGPatternElement = renderer.createElement('pattern', 'svg');
        renderer.setProperty(pattern, 'id', this.getTextureIDName(id));
        renderer.setAttribute(pattern, 'width', '12');
        renderer.setAttribute(pattern, 'height', '24');
        renderer.setAttribute(pattern, 'viewBox', '0 0 12 24');
        renderer.setAttribute(pattern, 'x', x.toString());
        renderer.setAttribute(pattern, 'y', y.toString());
        renderer.setAttribute(pattern, 'patternTransform', `rotate(${this.randomAngle})`);
        renderer.setAttribute(pattern, 'patternUnits', 'userSpaceOnUse');
        const g1: SVGGElement = renderer.createElement('g', 'svg');
        renderer.setAttribute(g1, 'fill', 'none');
        renderer.setAttribute(g1, 'fill-rule', 'evenodd');
        const g2: SVGGElement = renderer.createElement('g', 'svg');
        renderer.setAttribute(g2, 'fill', `rgb(${primaryColor.rgb.r},${primaryColor.rgb.g},${primaryColor.rgb.b})`);
        renderer.setAttribute(g2, 'fill-opacity', `${primaryColor.a}`);
        renderer.setAttribute(g2, 'name', 'texture');
        const path: SVGPathElement = renderer.createElement('path', 'svg');
        renderer.setAttribute(path, 'd',
            'M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 ' +
            '0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z');
        renderer.appendChild(g2, path);
        renderer.appendChild(g1, g2);
        renderer.appendChild(pattern, g1);
        renderer.appendChild(texture, pattern);
        return texture;
    }
}
