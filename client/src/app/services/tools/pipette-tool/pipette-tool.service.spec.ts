import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { PipetteToolService } from './pipette-tool.service';

describe('PipetteToolService', () => {
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle',]);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['setPrimaryColor', 'setSecondaryColor']);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
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
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy = TestBed.get(DrawingService);
    drawingServiceSpy.addObject.and.returnValue(1);
  });

  it('pipette service should be created', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    expect(service).toBeTruthy();
  });

  it('should do nothing if the click is not left or right', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 1 });

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();
  });

  it('should set the primary color from the background if target has tagname svg or no target name', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    drawingServiceSpy.color = { r: 200, g: 50, b: 4 };
    drawingServiceSpy.alpha = 0.3;

    const event = new MouseEvent('mousedown', { button: 0 });
    const svg = document.createElement('svg');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();

    expect(colorToolServiceSpy.primaryColor).toEqual(drawingServiceSpy.color);
    expect(colorToolServiceSpy.primaryAlpha).toEqual(drawingServiceSpy.alpha);
  });

  it('should set secondaryColor from the background if target has tagname svg or no target name', () => {
    colorToolServiceSpy.secondaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.secondaryAlpha = 0;
    colorToolServiceSpy.setSecondaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.secondaryColor = rgb;
      colorToolServiceSpy.secondaryAlpha = a;
    });

    drawingServiceSpy.color = { r: 200, g: 50, b: 4 };
    drawingServiceSpy.alpha = 0.3;

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 2 });

    const svg = document.createElement('svg');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).toHaveBeenCalled();

    expect(colorToolServiceSpy.secondaryColor).toEqual(drawingServiceSpy.color);
    expect(colorToolServiceSpy.secondaryAlpha).toEqual(drawingServiceSpy.alpha);
  });

  it('should do nothing if propertymap does not exist', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 0 });
    const svg = document.createElement('rect');
    svg.setAttribute('name', 'string');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();
    expect(service.onPressed(event)).toBeUndefined();
  });

  // it('should set primarycolor if object attribute starts with url on left click', () => {
  //   colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
  //   colorToolServiceSpy.primaryAlpha = 0;
  //   colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
  //     colorToolServiceSpy.primaryColor = rgb;
  //     colorToolServiceSpy.primaryAlpha = a;
  //   });

  //   const service: PipetteToolService = TestBed.get(PipetteToolService);
  //   const event = new MouseEvent('mousedown', { button: 0 });
  //   const texture = document.createElement('defs');
  //   const pattern = document.createElement('pattern');
  //   pattern.setAttribute('id', '1');
  //   const g1 = document.createElement('g');
  //   g1.setAttribute('fill', 'none');
  //   g1.setAttribute('fill-rule', 'evenodd');
  //   const g2 = document.createElement('g');
  //   g2.setAttribute('fill', 'rgb(200,50,5)');
  //   g2.setAttribute('fill-opacity', '0.3');
  //   g1.appendChild(g2);
  //   pattern.appendChild(g1);
  //   texture.appendChild(pattern);
  //   document.body.appendChild(texture);

  //   const svg = document.createElement('line');
  //   svg.setAttribute('name', 'brush');
  //   svg.style.setProperty('stroke', 'url("#1")');
  //   spyOnProperty(event, 'target').and.returnValue(svg);

  //   service.onPressed(event);

  //   expect(colorToolServiceSpy.setPrimaryColor).toHaveBeenCalled();
  //   expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();

  //   expect(colorToolServiceSpy.primaryColor).toEqual({ r: 200, g: 50, b: 5 });
  //   expect(colorToolServiceSpy.primaryAlpha).toEqual(0.3);
  // });

  it('should set secondarycolor if object attribute starts with url on right click', () => {
    colorToolServiceSpy.secondaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.secondaryAlpha = 0;
    colorToolServiceSpy.setSecondaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.secondaryColor = rgb;
      colorToolServiceSpy.secondaryAlpha = a;
    });

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 2 });
    const texture = document.createElement('defs');
    const pattern = document.createElement('pattern');
    pattern.setAttribute('id', '1');
    const g1 = document.createElement('g');
    g1.setAttribute('fill', 'none');
    g1.setAttribute('fill-rule', 'evenodd');
    const g2 = document.createElement('g');
    g2.setAttribute('fill', 'rgb(200,50,5)');
    g2.setAttribute('fill-opacity', '0.3');
    g1.appendChild(g2);
    pattern.appendChild(g1);
    texture.appendChild(pattern);
    document.body.appendChild(texture);

    const svg = document.createElement('line');
    svg.setAttribute('name', 'brush');
    svg.style.setProperty('stroke', 'url("#1")');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).toHaveBeenCalled();

    expect(colorToolServiceSpy.secondaryColor).toEqual({ r: 200, g: 50, b: 5 });
    expect(colorToolServiceSpy.secondaryAlpha).toEqual(0.3);
  });

  it('should set primaryColor of the current object fill on left click', () => {
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.setPrimaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.primaryColor = rgb;
      colorToolServiceSpy.primaryAlpha = a;
    });

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 0 });

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rectangle');
    svg.style.setProperty('fill', 'rgb(200,50,4)');
    svg.style.setProperty('fill-opacity', '0.3');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();

    expect(colorToolServiceSpy.primaryColor).toEqual({ r: 200, g: 50, b: 4 });
    expect(colorToolServiceSpy.primaryAlpha).toEqual(0.3);

  });

  it('should set secondaryColor of the current object fill on right click', () => {
    colorToolServiceSpy.secondaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.secondaryAlpha = 0;
    colorToolServiceSpy.setSecondaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.secondaryColor = rgb;
      colorToolServiceSpy.secondaryAlpha = a;
    });

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 2 });

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rectangle');
    svg.style.setProperty('fill', 'rgb(200,50,4)');
    svg.style.setProperty('fill-opacity', '0.3');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).toHaveBeenCalled();

    expect(colorToolServiceSpy.secondaryColor).toEqual({ r: 200, g: 50, b: 4 });
    expect(colorToolServiceSpy.secondaryAlpha).toEqual(0.3);

  });

  it('should return undefined if rgbValue does not exist', () => {

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 0 });

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('name', 'rectangle');
    svg.style.setProperty('fill', '');
    svg.style.setProperty('fill-opacity', '');
    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();

    expect(service.onPressed(event)).toBeUndefined();

  });

  it('should do nothing with "onRelease, onMove, onKeyUp, onKeyDown"', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const mouseEvent = new MouseEvent('mousedown');
    const keyboardEvent = new KeyboardEvent('keydown');

    service.onMove(mouseEvent);
    service.onRelease(mouseEvent);

    service.onKeyDown(keyboardEvent);
    service.onKeyUp(keyboardEvent);

    expect().nothing();
  });

});
