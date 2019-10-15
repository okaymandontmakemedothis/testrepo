import { TestBed } from '@angular/core/testing';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { PipetteToolService } from './pipette-tool.service';

describe('PipetteToolService', () => {
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;

  beforeEach(() => {
    const spyDrawingService = jasmine.createSpyObj('DrawingService', ['']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['setPrimaryColor', 'setSecondaryColor']);

    TestBed.configureTestingModule({
      providers: [SVGElement,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    drawingServiceSpy = TestBed.get(DrawingService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
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

  it('should set the primary color of the object on left click', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 0 });

    const svg = document.createElement('rect');

    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).not.toHaveBeenCalled();
  });

  it('should set the secondary color of the object on right click', () => {
    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 2 });

    const svg = document.createElement('rect');

    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).toHaveBeenCalled();
  });

  it('should set secondaryColor of the current object fill', () => {
    colorToolServiceSpy.secondaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.secondaryAlpha = 0;
    colorToolServiceSpy.setSecondaryColor.and.callFake((rgb, a) => {
      colorToolServiceSpy.secondaryColor = rgb;
      colorToolServiceSpy.secondaryAlpha = a;
    });

    const service: PipetteToolService = TestBed.get(PipetteToolService);
    const event = new MouseEvent('mousedown', { button: 2 });

    const svg = document.createElement('rect') as Element as SVGElement;
    svg.setAttribute('style', 'fill:rgb(200,50,4);fill-opacity:0.3');

    spyOnProperty(event, 'target').and.returnValue(svg);

    service.onPressed(event);

    expect(colorToolServiceSpy.setPrimaryColor).not.toHaveBeenCalled();
    expect(colorToolServiceSpy.setSecondaryColor).toHaveBeenCalled();

    expect(colorToolServiceSpy.secondaryColor).toEqual({ r: 200, g: 50, b: 4 });
    expect(colorToolServiceSpy.secondaryAlpha).toEqual(0.3);
  });

  it('should set secondaryColor of the background because the element doesnt have a filling', () => {
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
