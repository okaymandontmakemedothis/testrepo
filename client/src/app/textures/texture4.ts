import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_FOUR } from './texture-id';
import { Renderer2 } from '@angular/core';

/// Classe avec les informations de la texture de texture four
/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureFour implements ITexture {
    readonly id: number = TEXTURE_FOUR;
    readonly name = 'Texture Four';
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
            `M9,0 L11,0 L11,20 L9,20 L9,0 Z M34.1339746,0.839745962 L35.8660254,1.83974596
            L25.8660254,19.160254 L24.1339746,18.160254 L34.1339746,0.839745962 Z M14.1339746,20.839746
            L15.8660254,21.839746 L5.8660254,39.160254 L4.1339746,38.160254 L14.1339746,20.839746
            Z M58.160254,4.1339746 L59.160254,5.8660254 L41.839746,15.8660254 L40.839746,14.1339746
            L58.160254,4.1339746 Z M18.160254,44.1339746 L19.160254,45.8660254 L1.83974596,55.8660254
            L0.839745962,54.1339746 L18.160254,44.1339746 Z M80,9 L80,11 L60,11 L60,9 L80,9 Z M20,69
            L20,71 L0,71 L0,69 L20,69 Z M99.3205081,14 L98.3205081,15.7320508 L81,5.73205081 L82,4
            L99.3205081,14 Z M19.3205081,94 L18.3205081,95.7320508 L1,85.7320508 L2,84 L19.3205081,94
            Z M115.866025,18.160254 L114.133975,19.160254 L104.133975,1.83974596 L105.866025,0.839745962
            L115.866025,18.160254 Z M15.8660254,118.160254 L14.1339746,119.160254 L4.1339746,101.839746
            L5.8660254,100.839746 L15.8660254,118.160254 Z M38.160254,24.1339746 L39.160254,25.8660254
            L21.839746,35.8660254 L20.839746,34.1339746 L38.160254,24.1339746 Z M60,29 L60,31
            L40,31 L40,29 L60,29 Z M79.3205081,34 L78.3205081,35.7320508 L61,25.7320508 L62,24
            L79.3205081,34 Z M95.8660254,38.160254 L94.1339746,39.160254 L84.1339746,21.839746
            L85.8660254,20.839746 L95.8660254,38.160254 Z M111,40 L109,40 L109,20
            L111,20 L111,40 Z M114.133975,40.839746 L115.866025,41.839746
            L105.866025,59.160254 L104.133975,58.160254 L114.133975,40.839746 Z M40,49
            L40,51 L20,51 L20,49 L40,49 Z M59.3205081,54 L58.3205081,55.7320508
            L41,45.7320508 L42,44 L59.3205081,54 Z M75.8660254,58.160254
            L74.1339746,59.160254 L64.1339746,41.839746 L65.8660254,40.839746
            L75.8660254,58.160254 Z M91,60 L89,60 L89,40 L91,40 L91,60 Z M94.1339746,60.839746
            L95.8660254,61.839746 L85.8660254,79.160254 L84.1339746,78.160254
            L94.1339746,60.839746 Z M118.160254,64.1339746 L119.160254,65.8660254 L101.839746,75.8660254
            L100.839746,74.1339746 L118.160254,64.1339746 Z M39.3205081,74 L38.3205081,75.7320508 L21,65.7320508
            L22,64 L39.3205081,74 Z M55.8660254,78.160254 L54.1339746,79.160254 L44.1339746,61.839746
            L45.8660254,60.839746 L55.8660254,78.160254 Z M71,80 L69,80 L69,60 L71,60 L71,80 Z
            M74.1339746,80.839746 L75.8660254,81.839746 L65.8660254,99.160254 L64.1339746,98.160254
            L74.1339746,80.839746 Z M98.160254,84.1339746 L99.160254,85.8660254 L81.839746,95.8660254
            L80.839746,94.1339746 L98.160254,84.1339746 Z M120,89 L120,91 L100,91 L100,89 L120,89
            Z M35.8660254,98.160254 L34.1339746,99.160254 L24.1339746,81.839746 L25.8660254,80.839746
            L35.8660254,98.160254 Z M51,100 L49,100 L49,80 L51,80 L51,100 Z M54.1339746,100.839746
            L55.8660254,101.839746 L45.8660254,119.160254 L44.1339746,118.160254 L54.1339746,100.839746
            Z M78.160254,104.133975 L79.160254,105.866025 L61.839746,115.866025 L60.839746,114.133975
            L78.160254,104.133975 Z M100,109 L100,111 L80,111 L80,109 L100,109 Z M119.320508,114
            L118.320508,115.732051 L101,105.732051 L102,104 L119.320508,114 Z M31,120 L29,120 L29,100
            L31,100 L31,120 Z`);
        renderer.setProperty(path, 'id', 'Combined-Shape');
        renderer.appendChild(g2, path);
        renderer.appendChild(g1, g2);
        renderer.appendChild(pattern, g1);
        renderer.appendChild(texture, pattern);
        return texture;
    }
}
