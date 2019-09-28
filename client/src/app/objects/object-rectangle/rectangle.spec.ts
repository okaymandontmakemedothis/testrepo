import { TestBed } from '@angular/core/testing';

import { RectangleObject } from './rectangle';

describe('RectangleObject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 0, '');
    expect(object).toBeTruthy();
  });

  it('should draw nothing', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 0, '');
    expect(object.draw()).toEqual('');
  });

  it('should draw', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 1, '');
    expect(object.draw()).toEqual("<rect id=\"" + object.id + "\" x=\"" + object.x + "\" y=\"" + object.y + "\" width=\"" + object.width + "\" height=\"" + object.height + "\" style=" + object.getStyle() + " />");
  });

  it('should get the style center', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 0, 'center');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual("\"fill:rgba(" + object.primaryColor.rgb.r + "," + object.primaryColor.rgb.g + "," + object.primaryColor.rgb.b + "," + object.primaryColor.a + ")\"");
  });

  it('should get the style border', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 0, 'border');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual("\"fill:none;stroke-width:" + object.strokeWidth + ";stroke:rgb(" + object.secondaryColor.rgb.r + "," + object.secondaryColor.rgb.g + "," + object.secondaryColor.rgb.b + "," + object.secondaryColor.a + ")\"");
  });

  it('should get the style fill', () => {
    const object: RectangleObject = new RectangleObject(0, 0, 0, 'fill');
    object.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    object.secondaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    expect(object.getStyle()).toEqual("\"fill:rgb(" + object.primaryColor.rgb.r + "," + object.primaryColor.rgb.g + "," + object.primaryColor.rgb.b + "," + object.primaryColor.a + ");stroke-width:" + object.strokeWidth + ";stroke:rgb(" + object.secondaryColor.rgb.r + "," + object.secondaryColor.rgb.g + "," + object.secondaryColor.rgb.b + "," + object.secondaryColor.a + ")\"");
  });
});
