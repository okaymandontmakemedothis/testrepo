import { TestBed } from '@angular/core/testing';
import { ITexture } from 'src/app/textures/ITexture';
import { TEXTURE_ONE, TEXTURE_TWO } from 'src/app/textures/texture-id';
import { TexturesService } from './textures.service';

describe('TexturesService', () => {
  let service: TexturesService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TexturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.textureList.size).toBeGreaterThan(0);
  });

  it('should return texture one if outside the size of the list', () => {
    const outsideOfListIndex = service.textureList.size + 1;
    const texture: ITexture = service.returnTexture(outsideOfListIndex);
    expect(texture.id).toBe(TEXTURE_ONE);
  });

  it('should return texture of the index if outside the size of the list', () => {
    const texture: ITexture = service.returnTexture(TEXTURE_TWO);
    expect(texture.id).toBe(TEXTURE_TWO);
  });

  it('should return texture one as the first texture option', () => {
    expect(service.firstTexture.value).toBe(TEXTURE_ONE);
  });
});
