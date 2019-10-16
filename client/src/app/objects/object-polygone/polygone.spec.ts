import { TestBed } from '@angular/core/testing';
import { PolygoneObject } from './polygone';

describe('PolygoneObject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('object polygone should be created', () => {
    const object: PolygoneObject = new PolygoneObject(0, 0, 0, 0, '');
    expect(object).toBeTruthy();
  });

  it('should draw nothing', () => {
    const object: PolygoneObject = new PolygoneObject(0, 0, 0, 0, '');
    expect(object.draw()).toEqual('');
  });

  it('should draw', () => {
    const object: PolygoneObject = new PolygoneObject(1, 1, 3, 1, '');
    expect(object.draw()).toEqual(
      '<polygon id="' + object.id + '" points="' + object.getPointsString(object.points)
      + '" style=' + object.getStyle() + ' />');
  });

  it('should set initialAngle to 315', () => {
    const object: PolygoneObject = new PolygoneObject(1, 1, 4, 1, '');
    expect(object.initialAngle).toEqual(315);
  });

  it('should get the style center', () => {
    const object: PolygoneObject = new PolygoneObject(0, 0, 0, 1, 'center');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:rgba('
      + object.primaryColor.rgb.r + ',' + object.primaryColor.rgb.g + ',' + object.primaryColor.rgb.b + ',' + object.primaryColor.a + ')"');
  });

  it('should get the style border', () => {
    const object: PolygoneObject = new PolygoneObject(0, 0, 0, 1, 'border');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:none;stroke-width:' +
      object.strokeWidth + ';stroke:rgb(' + object.secondaryColor.rgb.r + ',' + object.secondaryColor.rgb.g +
      ',' + object.secondaryColor.rgb.b + ',' + object.secondaryColor.a + ')"');
  });

  it('should get the style fill', () => {
    const object: PolygoneObject = new PolygoneObject(0, 0, 0, 1, 'fill');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual('"fill:rgb(' + object.primaryColor.rgb.r +
      ',' + object.primaryColor.rgb.g + ',' + object.primaryColor.rgb.b + ',' + object.primaryColor.a +
      ');stroke-width:' + object.strokeWidth + ';stroke:rgb(' + object.secondaryColor.rgb.r +
      ',' + object.secondaryColor.rgb.g + ',' + object.secondaryColor.rgb.b + ',' + object.secondaryColor.a + ')"');
  });
});
