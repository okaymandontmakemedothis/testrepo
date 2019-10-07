import { TestBed } from '@angular/core/testing';
import { EtampeObject } from './etampe';


describe('EtampeObject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('stamp object should be created', () => {
    const object: EtampeObject = new EtampeObject(0, 0, '');
    expect(object).toBeTruthy();
  });

  it('should draw', () => {
    const object: EtampeObject = new EtampeObject(0, 0, '');
    const x = (object.x - (object.width / 2));
    const y = (object.y - (object.height / 2));
    expect(object.draw()).toEqual(
      '<image id="' + object.id + '" x="' + x + '" y="' + y +
      '" width="' + object.width + '" height="' + object.height + '" xlink:href=' + object.url +
      '" transform=' + 'rotate(0,0,0)' + ' />');
  });

  it('should return rotation string', () => {
    const object: EtampeObject = new EtampeObject(0, 0, '');
    object.angle = 10;

    expect(object.getRotation()).toEqual(
      '" transform=' + 'rotate(10,0,0)');
  });

});
