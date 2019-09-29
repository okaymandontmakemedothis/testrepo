import { TestBed } from '@angular/core/testing';
import { TextureOne } from '../../textures/texture1';
import { TextureTwo } from '../../textures/texture2';
import { Polyline } from './polyline';

describe('BrushToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 0);
    expect(polyline).toBeTruthy();
  });

  it('should add a point', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 0);
    polyline.addPoint({ x: 1, y: 1 });
    expect(polyline.pointsList.length).toBe(2);
  });

  it('should add a point', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 0);
    polyline.addPoint({ x: 1, y: 1 });
    expect(polyline.pointsList.length).toBe(2);
  });


  it('should modifie the object x and y', () => {
    const polyline: Polyline = new Polyline({ x: 50, y: 50 }, 0);

    expect(polyline.x).toBe(50);
    expect(polyline.y).toBe(50);

    polyline.addPoint({ x: 1, y: 1 });

    expect(polyline.x).toBe(1);
    expect(polyline.y).toBe(1);
  });

  /*it('should modifie the object height and width', () => {
    const polyline: Polyline = new Polyline({ x: 50, y: 50 }, 0);

    expect(polyline.width).toBe(0);
    expect(polyline.height).toBe(0);

    polyline.addPoint({ x: 10, y: 10 });

    expect(polyline.x).toBe(10);
    expect(polyline.y).toBe(10);
  });*/

  it('should draw well with more than 1 point', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 3);

    polyline.addPoint({ x: 50, y: 50 });
    polyline.id = 1;
    polyline.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };

    expect(polyline.draw()).toEqual(`<polyline id="1" fill="none" stroke-width="3"
 stroke="rgb(255,255,255)"  stroke-linecap="round" stroke-linejoin="round" points="0 0,50 50,"/>\n`);
  });

  it('should draw well with 1 point', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 3);

    polyline.id = 1;
    polyline.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };

    expect(polyline.draw()).toEqual(`<circle id="1" cx="0" cy="0" r="${3 / 2}" fill="rgb(255,255,255)" />\n`);
  });


  it('should draw well with 1 point and a filter and a texture', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 3, new TextureOne());

    polyline.id = 1;
    polyline.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    polyline.secondaryColor = { rgb: { r: 0, g: 0, b: 0 }, a: 0 };

    expect(polyline.draw()).toEqual(`<circle id="1" cx="0" cy="0" r="${3 / 2}" fill="rgb(255,255,255)" />\n`);
  });

  it('should draw well with 1 point and NO filter and a texture', () => {
    const polyline: Polyline = new Polyline({ x: 0, y: 0 }, 3, new TextureTwo());

    polyline.id = 1;
    polyline.primaryColor = { rgb: { r: 255, g: 255, b: 255 }, a: 1 };
    polyline.secondaryColor = { rgb: { r: 0, g: 0, b: 0 }, a: 0 };

    expect(polyline.draw()).toEqual(`<circle id="1" cx="0" cy="0" r="${3 / 2}" fill="rgb(255,255,255)" />\n`);
  });

});
