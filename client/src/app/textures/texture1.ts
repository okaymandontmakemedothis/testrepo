import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_ONE } from './texture-id';

/// Classe avec les informations de la texture de texture one
/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureOne implements ITexture {
    readonly id: number = TEXTURE_ONE;
    readonly name = 'Texture One';
    readonly randomAngle = Math.round(Math.random() * 360);

    getTextureIDName(id: number): string {
        return `${this.id}-${id}`;
    }
    getPattern(primaryColor: RGBA, secondaryColor: RGBA, id: number, x: number, y: number): string {
        return `<defs>
<pattern id="${this.getTextureIDName(id)}" width="12" height="24" viewBox="0 0 12 24" x="${x}" y="${y}"
 patternTransform="rotate(${this.randomAngle})" patternUnits="userSpaceOnUse">
<g fill="none" fill-rule="evenodd">
<g fill="rgb(${primaryColor.rgb.r},${primaryColor.rgb.g},${primaryColor.rgb.b})"
 fill-opacity="${primaryColor.a}">
<path d="M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 
 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z"/>
</g>
</g>
</pattern>
</defs>`;
    }

    getFilter(id: number): string | null {
        return null;
    }
}
