import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_THREE } from './texture-id';
import { Renderer2 } from '@angular/core';

/// Classe avec les informations de la texture de texture three
/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureThree implements ITexture {
    readonly id: number = TEXTURE_THREE;
    readonly name = 'Texture Three';
    readonly randomAngle = Math.round(Math.random() * 360);
    getTextureIDName(id: number): string {
        return `${this.id}-${id}`;
    }

    /// Retourne la ligne html du pattern
    getPattern(primaryColor: RGBA, secondaryColor: RGBA, id: number, x: number, y: number, renderer: Renderer2): SVGDefsElement {
        const texture: SVGDefsElement = renderer.createElement('defs', 'svg');
        const pattern: SVGPatternElement = renderer.createElement('pattern', 'svg');
        renderer.setProperty(pattern, 'id', this.getTextureIDName(id));
        renderer.setAttribute(pattern, 'width', '15px');
        renderer.setAttribute(pattern, 'height', '8px');
        renderer.setAttribute(pattern, 'viewBox', '0 0 20 12');
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
            `M6,12 C6,11.3784524 5.90549098,10.7789786 5.73005951,10.2151652 C6.81793291,11.3170865
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
        C8.8954305,4 8,4.8954305 8,6 C8,7.1045695 8.8954305,8 10,8 L10,8 Z`);
        renderer.setProperty(path, 'id', 'Combined-Shape');
        renderer.appendChild(g2, path);
        renderer.appendChild(g1, g2);
        renderer.appendChild(pattern, g1);
        renderer.appendChild(texture, pattern);
        return texture;
    }
}
