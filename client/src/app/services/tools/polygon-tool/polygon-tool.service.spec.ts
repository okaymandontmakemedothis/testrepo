import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { PolygonToolService } from './polygon-tool.service';

describe('PolygonToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let svgEl: SVGPolygonElement;
  let svgContour: SVGRectElement;

  beforeEach(() => {
    svgEl = document.createElementNS('svg','polygon') as SVGPolygonElement;
    svgContour = document.createElementNS('svg', 'rect') as SVGRectElement;
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      providers: [Renderer2,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    drawingServiceSpy = TestBed.get(DrawingService);
    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy.addObject.and.returnValue(1);

    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;
  });

  it('tool-polygon service should be created', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    expect(service).toBeTruthy();
  });

  it('should not addObject if contour doesnt exist ', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('rect');

  });

  it('should create an object with good color on both click when polygonStyle is center', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('polygonStyle') as FormControl).patchValue('center');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
    `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
    `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());
  });

  it('should create an object with good color on both click when polygonStyle is border', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('polygonStyle') as FormControl).patchValue('border');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
      colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should create an object with good color on both click when polygonStyle is fill', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('polygonStyle') as FormControl).patchValue('fill');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
      `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
      `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
      `rgba(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity',
      colorToolServiceSpy.secondaryAlpha.toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
      `rgba(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
      colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should be undefined if case id default', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    (service.parameters.get('polygonStyle') as FormControl).patchValue('');
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    expect(service.onPressed(new MouseEvent('mousedown', { button: 0 }))).toBeUndefined();
  });

  it('should do nothing if mouse button is not left or right', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });

  it('should not call add object if object is undefined onMove', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));
    drawingServiceSpy.addObject.calls.reset();

    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(setSizeSpy).not.toHaveBeenCalled();
  });

  it('should call remove object if object exist onRelease', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));
    expect(drawingServiceSpy.removeObject).toHaveBeenCalled();

  });

  it('should not call remove object if object is undefined onRelease', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    service.onRelease(new MouseEvent('mouseup'));

    expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
  });

  it('should set size of object on mouse move', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const setSizeSpy = spyOn(service as any, 'setSize');
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('polygon');
    expect(setSizeSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should not draw anything if size <= 0', () => {
    const service: PolygonToolService = TestBed.get(PolygonToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    svgEl.setAttribute('x', '10');
    svgEl.setAttribute('y', '10');
    (service.parameters.get('vertexNumber') as FormControl).patchValue(3);
    (service.parameters.get('strokeWidth') as FormControl).patchValue(1);
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue(svgContour);
    rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue(svgEl);
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 2 });
    const moveEvent = new MouseEvent('mousemove', { movementX: undefined, movementY: undefined });
    service.onMove(moveEvent);
    expect(rendererSpy.setAttribute).not.toHaveBeenCalledWith(svgEl, 'points');
  });

});
