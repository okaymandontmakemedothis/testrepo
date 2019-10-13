import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_FIVE } from './texture-id';
import { Renderer2 } from '@angular/core';

/// Classe avec les informations de la texture de texture five
/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureFive implements ITexture {
    readonly id: number = TEXTURE_FIVE;
    readonly name = 'Texture Five';
    readonly randomAngle = Math.round(Math.random() * 360);

    getTextureIDName(id: number): string {
        return `${this.id}-${id}`;
    }

    /// Retourne la ligne html du pattern
    getPattern(primaryColor: RGBA, id: number, x: number, y: number, renderer: Renderer2): SVGDefsElement {
        const texture: SVGDefsElement = renderer.createElement('defs', 'svg');
        const pattern: SVGPatternElement = renderer.createElement('pattern', 'svg');
        renderer.setProperty(pattern, 'id', this.getTextureIDName(id));
        renderer.setAttribute(pattern, 'width', '60px');
        renderer.setAttribute(pattern, 'height', '60px');
        renderer.setAttribute(pattern, 'viewBox', '0 0 60 60');
        renderer.setAttribute(pattern, 'x', x.toString());
        renderer.setAttribute(pattern, 'y', y.toString());
        renderer.setAttribute(pattern, 'patternTransform', `rotate(${this.randomAngle})`);
        renderer.setAttribute(pattern, 'patternUnits', 'userSpaceOnUse');
        const g1: SVGGElement = renderer.createElement('g', 'svg');
        renderer.setProperty(g1, 'id', 'Page-1');
        renderer.setAttribute(g1, 'stroke', 'none');
        renderer.setAttribute(g1, 'fill', 'none');
        renderer.setAttribute(g1, 'fill-rule', 'evenodd');
        const g2: SVGGElement = renderer.createElement('g', 'svg');
        renderer.setProperty(g2, 'id', 'morphing-diamonds');
        renderer.setAttribute(g2, 'fill', `rgb(${primaryColor.rgb.r},${primaryColor.rgb.g},${primaryColor.rgb.b})`);
        renderer.setAttribute(g2, 'fill-opacity', `${primaryColor.a}`);
        const path: SVGPathElement = renderer.createElement('path', 'svg');
        renderer.setAttribute(path, 'd',
            `M1 3h1v1H1V3zm2-2h1v1H3V1z`);
        renderer.setProperty(path, 'id', 'Combined-Shape');
        renderer.appendChild(g2, path);
        renderer.appendChild(g1, g2);
        renderer.appendChild(pattern, g1);
        renderer.appendChild(texture, pattern);
        return texture;
    }

    getFilter(id: number): string | null {
        return null;
    }
}
