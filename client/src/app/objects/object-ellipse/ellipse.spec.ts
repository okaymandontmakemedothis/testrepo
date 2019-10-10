import { TestBed } from '@angular/core/testing';
import { EllipseObject } from './ellipse';

describe('EllipseObject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('object ellipse should be created', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 0, 0, 0, '');
    expect(object).toBeTruthy();
  });

  it('should draw nothing', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 0, 0, 0, '');
    expect(object.draw()).toEqual('');
  });

  it('should draw', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 1, 1, 1, '');
    expect(object.draw()).toEqual(
      '<ellipse id="' + object.id + '" cx="' + object.width / 2 + '" cy="' + object.height / 2 +
      '" rx="' + object.width / 2 + '" ry="' + object.height / 2 + '" style=' + object.getStyle() + ' />');
  });

  it('should get the style center', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 1, 1, 1, 'center');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:rgba('
      + object.primaryColor.rgb.r + ',' + object.primaryColor.rgb.g + ',' + object.primaryColor.rgb.b + ',' + object.primaryColor.a + ')"');
  });

  it('should get the style border', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 1, 1, 1, 'border');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:none;stroke-width:' +
      object.strokeWidth + ';stroke:rgb(' + object.secondaryColor.rgb.r + ',' + object.secondaryColor.rgb.g +
      ',' + object.secondaryColor.rgb.b + ',' + object.secondaryColor.a + ')"');
  });

  it('should get the style fill', () => {
    const object: EllipseObject = new EllipseObject(0, 0, 1, 1, 1, 'fill');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:rgb(' + object.primaryColor.rgb.r +
      ',' + object.primaryColor.rgb.g + ',' + object.primaryColor.rgb.b + ',' + object.primaryColor.a +
      ');stroke-width:' + object.strokeWidth + ';stroke:rgb(' + object.secondaryColor.rgb.r +
      ',' + object.secondaryColor.rgb.g + ',' + object.secondaryColor.rgb.b + ',' + object.secondaryColor.a + ')"');
  });
});
