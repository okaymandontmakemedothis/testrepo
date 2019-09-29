import { TestBed } from '@angular/core/testing';

import { BrushToolService } from './brush-tool.service';
import { Polyline } from 'src/app/objects/object-polyline/polyline';

describe('BrushToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service).toBeTruthy();
  });

  it('should add point of the current polyline when mouse is moved', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.onMove(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT add point of the current polyline when mouse is moved', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.onRelease(new MouseEvent('mousedown'));
    service.onMove(new MouseEvent('mousedown'));
    expect(spy).not.toHaveBeenCalled();
  });
});
