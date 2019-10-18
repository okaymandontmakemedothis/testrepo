import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ToolsApplierColorsService } from './tools-applier-colors.service';

describe('ToolsApplierColorsService', () => {
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'getObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });
    drawingServiceSpy = TestBed.get(DrawingService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy.addObject.and.returnValue(1);
  });

  it('applier service should be created', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    expect(service).toBeTruthy();
  });

  it('should change the primary color of the object on left click', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mousedown', { button: 0 });
    colorToolServiceSpy.primaryColor = { r: 255, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0.5;

    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    // spyOnProperty(mouseEvent, 'target').and.returnValue(svg);
    const setColorsSpy = spyOn(service, 'setColors');
    const setOpacitySpy = spyOn(service, 'setOpacity');

    service.onPressed(mouseEvent);
    expect(setColorsSpy).toHaveBeenCalledWith({ r: 255, g: 0, b: 0 }, 'rect');
    expect(setOpacitySpy).toHaveBeenCalledWith(0.5, 'rect');
  });

  it('should change the secondary color of the object on right click', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mousedown', { button: 2 });
    colorToolServiceSpy.secondaryColor = { r: 255, g: 0, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;

    // const svg = document.createElement('rect') as Element as SVGElement;
    // svg.setAttribute('style', 'stroke: rgb(0, 0, 255); stroke-opacity: 1');
    // spyOnProperty(mouseEvent, 'target').and.returnValue(svg);
    rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
    // spyOnProperty(mouseEvent, 'target').and.returnValue(svg);
    const setColorsSpy = spyOn(service, 'setColors');
    const setOpacitySpy = spyOn(service, 'setOpacity');

    service.onPressed(mouseEvent);
    expect(setColorsSpy).toHaveBeenCalledWith({ r: 255, g: 0, b: 255 }, 'rect');
    expect(setOpacitySpy).toHaveBeenCalledWith(0.5, 'rect');
  });

  it('should not change the primary color of the object on left click if no object is clicked', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 0 });
    colorToolServiceSpy.primaryColor = { r: 255, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0.5;

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('style', 'fill: rgb(0, 0, 255); fill-opacity: 1');
    spyOnProperty(mouseEvent, 'target').and.returnValue(svg);
    service.onPressed(mouseEvent);

    expect(svg.style.getPropertyValue('fill')).toEqual('rgb(0, 0, 255)');
    expect(svg.style.getPropertyValue('fill-opacity')).toEqual('1');
  });

  it('should not change the secondary color of the object on right click if no object is clicked', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('click', { button: 2 });
    colorToolServiceSpy.secondaryColor = { r: 255, g: 0, b: 0 };
    colorToolServiceSpy.secondaryAlpha = 0.5;

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('style', 'stroke: rgb(0, 0, 255); stroke-opacity: 1');
    spyOnProperty(mouseEvent, 'target').and.returnValue(svg);

    service.onPressed(mouseEvent);
    expect(svg.style.getPropertyValue('stroke')).toEqual('rgb(0, 0, 255)');
    expect(svg.style.getPropertyValue('stroke-opacity')).toEqual('1');
  });

  it('should return null on release', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeUndefined();
  });

  it('should return null on move', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeUndefined();
  });
});
