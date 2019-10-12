import { Injectable } from '@angular/core';
import { TextureOptions } from '../../model/texture-options.model';
import { ITexture } from '../../textures/ITexture';
import { TEXTURE_FIVE, TEXTURE_FOUR, TEXTURE_ONE, TEXTURE_THREE, TEXTURE_TWO } from '../../textures/texture-id';
import { TextureOne } from '../../textures/texture1';
import { TextureTwo } from '../../textures/texture2';
import { TextureThree } from '../../textures/texture3';
import { TextureFour } from '../../textures/texture4';
import { TextureFive } from '../../textures/texture5';

/// Classe service qui permet de retourner une texture selon un indexe
@Injectable({
  providedIn: 'root',
})
export class TexturesService {
  textureOptionList: TextureOptions[] = [
    { value: TEXTURE_ONE, viewValue: 'Texture 1' },
    { value: TEXTURE_TWO, viewValue: 'Texture 2' },
    { value: TEXTURE_THREE, viewValue: 'Texture 3' },
    { value: TEXTURE_FOUR, viewValue: 'Texture 4' },
    { value: TEXTURE_FIVE, viewValue: 'Texture 5' },
  ];
  textureList: Map<number, ITexture> = new Map<number, ITexture>();

  constructor() {
    this.initTexureMap();
  }

  /// Initialise la liste de tous les textures par défault
  private initTexureMap(): void {
    let texture: ITexture;
    texture = new TextureOne();
    this.textureList.set(texture.id, texture);
    texture = new TextureTwo();
    this.textureList.set(texture.id, texture);
    texture = new TextureThree();
    this.textureList.set(texture.id, texture);
    texture = new TextureFour();
    this.textureList.set(texture.id, texture);
    texture = new TextureFive();
    this.textureList.set(texture.id, texture);
  }

  /// Retourne la première texture
  get firstTexture(): TextureOptions {
    return this.textureOptionList[0];
  }

  /// Retourne la texture de l'index voulue
  returnTexture(textureNumber: number): ITexture|null {
    if (textureNumber < 0) {
      return null;
    }
    const texture: ITexture | undefined = this.textureList.get(textureNumber);
    if (texture) {
      return texture;
    } else {
      return new TextureOne();
    }
  }
}
