import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { SelectionToolService } from './selection-tool.service';

describe('SelectionToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    rendererSpy = jasmine.createSpyObj('Renderer2',
      ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle']);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject', 'getObject', 'getObjectList']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };
    TestBed.configureTestingModule({
      providers: [Renderer2,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
      ],
    });

    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    drawingServiceSpy = TestBed.get(DrawingService);
  });

  it('should be created', () => {
    const service: SelectionToolService = TestBed.get(SelectionToolService);
    expect(service).toBeTruthy();
  });

  it('#onPress should do nothing', () => {
    const service: SelectionToolService = TestBed.get(SelectionToolService);
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
  });

  // it('#onPress should only remove selection', () => {
  //   const service: SelectionToolService = TestBed.get(SelectionToolService);
  //   const spy = spyOn(service, 'removeSelection');

  //   const svg = document.createElement('rect') as Element as SVGElement;
  //   svg.setAttribute('id', '1');

  //   drawingServiceSpy.getObject.and.returnValue(undefined);
  //   offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });

  //   const mouseEvent = new MouseEvent('mousedown', { button: 0 });
  //   spyOnProperty(mouseEvent, 'target').and.returnValue(svg);

  //   service.onPressed(mouseEvent);

  //   expect(spy).toHaveBeenCalled();
  //   expect(drawingServiceSpy.addObject).toHaveBeenCalled();
  // });

  it('onRelase should remove object if button =2', () => {
    const service: SelectionToolService = TestBed.get(SelectionToolService);
    const spy = spyOn(service as any, 'findObjects');
    const spyRemoveSel = spyOn(service as any, 'removeSelection');
    const spySetRect = spyOn(service as any, 'setRectSelection');

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('id', '1');

    drawingServiceSpy.getObject.and.returnValue(svg);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });

    const mouseEvent = new MouseEvent('mousedown', { button: 2 });

    spyOnProperty(mouseEvent, 'target').and.returnValue(svg);

    service.onPressed(mouseEvent);
    service.onRelease(mouseEvent);

    expect(spy).toHaveBeenCalled();
    expect(spyRemoveSel).toHaveBeenCalled();
    expect(spySetRect).toHaveBeenCalled();
    expect(drawingServiceSpy.removeObject).toHaveBeenCalled();
  });

  it('should do nothing on keydown and keyUp', () => {
    const service: SelectionToolService = TestBed.get(SelectionToolService);
    const eventKeyDown = new KeyboardEvent('keydown');
    const eventKeyUp = new KeyboardEvent('keyUp');

    service.onKeyDown(eventKeyDown);
    expect().nothing();

    service.onKeyUp(eventKeyUp);
    expect().nothing();
  });

});
