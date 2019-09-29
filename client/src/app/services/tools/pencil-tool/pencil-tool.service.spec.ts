import { TestBed } from '@angular/core/testing';

import { PencilToolService } from './pencil-tool.service';
import { Polyline } from 'src/app/objects/object-polyline/polyline';

describe('PencilToolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PencilToolService = TestBed.get(PencilToolService);
    expect(service).toBeTruthy();
  });

  it('should add point to the current polyline', () => {
    const service: PencilToolService = TestBed.get(PencilToolService);

    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);

    expect(spy).toHaveBeenCalled();
  });

  /*it('should not be able add point to the current polyline', () => {
    const service: PencilToolService = TestBed.get(PencilToolService);

    const object = service.onPressed(new MouseEvent('mousedown')) as Polyline;
    const spy = spyOn(object, 'addPoint').and.callThrough();
    service.onRelease(new MouseEvent('mousedown'));

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should create an object on press', () => {
    const service: PencilToolService = TestBed.get(PencilToolService);
    const object = service.onPressed(new MouseEvent('mousedown'));
    expect(object).toBeDefined();
  });

  it('should NOT add point of the current polyline when mouse is moved', () => {
    const service: PencilToolService = TestBed.get(PencilToolService);
    const spy = spyOn(service, 'addPoint').and.callThrough();
    service.onMove(new MouseEvent('mousedown'));
    expect(spy).not.toHaveBeenCalled();
  });*/
});
