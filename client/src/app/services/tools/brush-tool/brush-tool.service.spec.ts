import { TestBed } from '@angular/core/testing';

import { BrushToolService } from './brush-tool.service';
import { Polyline } from 'src/app/objects/object-polyline/polyline';

describe('BrushToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service).toBeTruthy();
  });
  it('should add point to the current polyline', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.addPoint({ x: 1, y: 1 });
    expect(spy).toHaveBeenCalled();
  });

  it('should not be able add point to the current polyline', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.onRelease(new MouseEvent('mousedown'));
    service.addPoint({ x: 1, y: 1 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should add point of the current polyline when mouse is moved', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    service.onPressed(new MouseEvent('mousedown'));
    const spy = spyOn(service, 'addPoint').and.callThrough();
    service.onMove(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT add point of the current polyline when mouse is moved', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const spy = spyOn(service, 'addPoint').and.callThrough();
    service.onMove(new MouseEvent('mousedown'));
    expect(spy).not.toHaveBeenCalled();
  });
});
