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
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['setPrimaryColor', 'setSecondaryColor']);
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

  it('should do nothing if the click is not left or right', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 1 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');
    service.onPressed(event);

    expect(spySetColor).not.toHaveBeenCalled();
    expect(spySetOpacity).not.toHaveBeenCalled();
  });

  it('should do nothing if targetname does not exist', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 0 });
    const svg = document.createElement('rect');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(service.onPressed(event)).toBeUndefined();
  });

  it('should do nothing if propertymap does not exist', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 1 });
    const svg = document.createElement('rect');
    svg.setAttribute('name', 'string');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(service.onPressed(event)).toBeUndefined();
  });

  it('should set primarycolor if object attribute starts with url on left click', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 0 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const texture = document.createElement('defs');
    const pattern = document.createElement('pattern');
    pattern.setAttribute('id', '1');
    const g1 = document.createElement('g');
    g1.setAttribute('fill', 'none');
    g1.setAttribute('fill-rule', 'evenodd');
    const g2 = document.createElement('g');
    g2.setAttribute('fill', 'rgb(200,50,5)');
    g2.setAttribute('fill-opacity', '0.3');
    g2.setAttribute('name', 'texture');

    g1.appendChild(g2);
    pattern.appendChild(g1);
    texture.appendChild(pattern);
    document.body.appendChild(texture);

    const svg = document.createElement('line');
    svg.setAttribute('name', 'brush');
    svg.style.setProperty('stroke', 'url("#1")');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(g2, colorToolServiceSpy.primaryColor, 'fill');
    expect(spySetOpacity).toHaveBeenCalledWith(g2, colorToolServiceSpy.primaryAlpha, 'fill-opacity');
  });

  it('should set primarycolor if object attribute starts with url on right click', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 2 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const texture = document.createElement('defs');
    const pattern = document.createElement('pattern');
    pattern.setAttribute('id', '1');
    const g1 = document.createElement('g');
    g1.setAttribute('fill', 'none');
    g1.setAttribute('fill-rule', 'evenodd');
    const g2 = document.createElement('g');
    g2.setAttribute('fill', 'rgb(200,50,5)');
    g2.setAttribute('fill-opacity', '0.3');
    g2.setAttribute('name', 'texture');
    g1.appendChild(g2);
    pattern.appendChild(g1);
    texture.appendChild(pattern);
    document.body.appendChild(texture);

    const svg = document.createElement('line');
    svg.setAttribute('name', 'brush');
    svg.style.setProperty('stroke', 'url("#1")');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(g2, colorToolServiceSpy.primaryColor, 'none');
    expect(spySetOpacity).toHaveBeenCalledWith(g2, colorToolServiceSpy.primaryAlpha, 'none');
  });

  it('should set primarycolor of object on left click', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 0 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rectangle');
    svg.style.setProperty('fill', 'rgb(200,50,4)');
    svg.style.setProperty('fill-opacity', '0.3');
    svg.setAttribute('id', '1');

    spyOnProperty(event, 'target').and.returnValue(svg);
    drawingServiceSpy.getObject.withArgs(1).and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryColor, 'fill');
    expect(spySetOpacity).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryAlpha, 'fill-opacity');
  });

  it('should set primarycolor of object on right click', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 2 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rectangle');
    svg.style.setProperty('fill', 'rgb(200,50,4)');
    svg.style.setProperty('fill-opacity', '0.3');
    svg.setAttribute('id', '1');

    spyOnProperty(event, 'target').and.returnValue(svg);
    drawingServiceSpy.getObject.withArgs(1).and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryColor, 'stroke');
    expect(spySetOpacity).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryAlpha, 'stroke-opacity');
  });

  it('should set primarycolor of object on left click with marker-mid', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 0 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const markerDef = document.createElement('defs');
    const marker = document.createElement('marker');
    marker.setAttribute('id', '0');
    const circle = document.createElement('circle');
    circle.setAttribute('fill', 'rgb(200,50,5)');
    circle.setAttribute('fill-opacity', '0.3');
    marker.appendChild(circle);
    markerDef.appendChild(marker);
    document.body.appendChild(markerDef);

    const svg = document.createElement('line') as Element as SVGElement;
    svg.setAttribute('name', 'line');
    svg.setAttribute('marker-mid', 'url(#0)');
    svg.setAttribute('id', '1');
    spyOnProperty(event, 'target').and.returnValue(svg);
    drawingServiceSpy.getObject.withArgs(1).and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryColor, 'stroke');
    expect(spySetOpacity).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryAlpha, 'stroke-opacity');

    expect(spySetColor).toHaveBeenCalledWith(circle, colorToolServiceSpy.primaryColor, 'fill');
    expect(spySetOpacity).toHaveBeenCalledWith(circle, colorToolServiceSpy.primaryAlpha, 'fillOpacity');
  });

  it('should set primarycolor of object on rightleft click with marker-mid', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 2 });
    const spySetColor = spyOn(service, 'setColors');
    const spySetOpacity = spyOn(service, 'setOpacity');

    const markerDef = document.createElement('defs');
    const marker = document.createElement('marker');
    marker.setAttribute('id', '0');
    const circle = document.createElement('circle');
    circle.setAttribute('fill', 'rgb(200,50,5)');
    circle.setAttribute('fill-opacity', '0.3');
    marker.appendChild(circle);
    markerDef.appendChild(marker);
    document.body.appendChild(markerDef);

    const svg = document.createElement('line') as Element as SVGElement;
    svg.setAttribute('name', 'line');
    svg.setAttribute('marker-mid', 'url(#0)');
    svg.setAttribute('id', '1');
    spyOnProperty(event, 'target').and.returnValue(svg);
    drawingServiceSpy.getObject.withArgs(1).and.returnValue(svg);

    service.onPressed(event);
    expect(spySetColor).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryColor, 'none');
    expect(spySetOpacity).toHaveBeenCalledWith(svg, colorToolServiceSpy.primaryAlpha, 'none');

    expect(spySetColor).toHaveBeenCalledWith(circle, colorToolServiceSpy.primaryColor, 'fill');
    expect(spySetOpacity).toHaveBeenCalledWith(circle, colorToolServiceSpy.primaryAlpha, 'fillOpacity');
  });

  it('should do nothing if property does not exist', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const event = new MouseEvent('mousedown', { button: 0 });

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rect');
    spyOnProperty(event, 'target').and.returnValue(svg);

    const svg2 = document.createElement('circle') as Element as SVGElement;
    svg2.setAttribute('name', 'string');
    svg2.setAttribute('id', '1');
    drawingServiceSpy.getObject.withArgs(1).and.returnValue(svg2);

    service.onPressed(event);

    expect(service.onPressed(event)).toBeUndefined();
  });

  it('should do setStyle if setColor is called', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const svg = document.createElement('rect') as Element as SVGElement;

    service.setColors(svg, colorToolServiceSpy.primaryColor, 'fill');

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith(svg, 'fill',
     `rgb(${colorToolServiceSpy.primaryColor.r}, ${colorToolServiceSpy.primaryColor.g},
        ${ colorToolServiceSpy.primaryColor.b})`);
  });

  it('should do setStyle if setOpacity is called', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const svg = document.createElement('rect') as Element as SVGElement;

    service.setOpacity(svg, colorToolServiceSpy.primaryAlpha, 'fill-opacity');

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith(svg, 'fill-opacity',
      colorToolServiceSpy.primaryAlpha.toString());
  });

  it('should do nothing with "onRelease, onMove, onKeyUp, onKeyDown"', () => {
    const service: ToolsApplierColorsService = TestBed.get(ToolsApplierColorsService);
    const mouseEvent = new MouseEvent('mousedown');
    const keyboardEvent = new KeyboardEvent('keydown');

    service.onMove(mouseEvent);
    service.onRelease(mouseEvent);

    service.onKeyDown(keyboardEvent);
    service.onKeyUp(keyboardEvent);

    expect().nothing();
  });
});
