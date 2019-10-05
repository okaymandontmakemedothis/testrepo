import { TestBed } from '@angular/core/testing';
import { EtampeObject } from './etampe';


describe('EtampeObject', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const object: EtampeObject = new EtampeObject(0, 0, '');
    expect(object).toBeTruthy();
  });

});
