import { RGBA } from 'src/app/model/rgba.model';
import { ITexture } from './ITexture';
import { TEXTURE_FIVE } from './texture-id';

/// Le pattern provient du site web https://www.heropatterns.com/
export class TextureFive implements ITexture {
    readonly id = TEXTURE_FIVE;
    readonly randomAngle = Math.round(Math.random() * 360);

    getName(id: number): string {
        return `${this.id}+${id}`;
    }
    getPattern(primaryColor: RGBA, secondaryColor: RGBA, id: number, x: number, y: number): string {
        return `<defs>
                <pattern id="${this.getName(id)}" viewBox="0,0,4,4" width="4" height="4" x="${x}" y="${y}"
                patternTransform="rotate(${this.randomAngle})" patternUnits="userSpaceOnUse">
                <path fill="rgb(${primaryColor.rgb.r},${primaryColor.rgb.g},${primaryColor.rgb.b})" fill-opacity="primaryColor.a"
                d="M1 3h1v1H1V3zm2-2h1v1H3V1z"></path>
                </pattern>
              </defs>`;
    }

    getFilter(id: number): string | null {
        return null;
    }
}
