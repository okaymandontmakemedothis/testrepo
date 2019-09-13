import { Color } from './color';
import { ColorError } from './color-error';

describe('Color', () => {
  it('should create an instance', () => {
    expect(new Color(0, 0, 0)).toBeTruthy();
  });

  it('colorWithRGBA variable must be less than 255', () => {
    expect(() => { Color.colorWithRGBA(256, 0, 0, 1); }).toThrow(new ColorError('256 is bad'));
  });

  it('colorWithRGBA variable must be more than 0', () => {
    expect(() => { Color.colorWithRGBA(23, 0, -1, 1); }).toThrow(new ColorError('-1 is bad'));
  });

  it('color should be of lenght 8', () => {
    const color: Color = Color.colorWithHex(0xffffff);
    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
  });

  it('colorWithHex should throw a ColorError', () => {
    expect(() => { Color.colorWithHex(0xfffff); }).toThrow(new ColorError('Your number must have 6 digits'));
  });

});
