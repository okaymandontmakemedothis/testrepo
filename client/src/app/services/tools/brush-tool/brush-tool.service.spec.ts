import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { TexturesService } from '../../textures/textures.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { BrushToolService } from './brush-tool.service';

describe('BrushToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let textureServiceSpy: jasmine.SpyObj<TexturesService>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
    let spyTextureService = jasmine.createSpyObj('TextureService', ['getTextureElement']);
    spyTextureService = {
      ...spyTextureService,
      firstTexture: {
        value: 0, viewValue: 'Texture One',
      },
    };
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
        { provide: ToolsColorService, useValue: spyColor },
        { provide: TexturesService, useValue: spyTextureService },
      ],
    });

    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    textureServiceSpy = TestBed.get(TexturesService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy = TestBed.get(DrawingService);
    drawingServiceSpy.addObject.and.returnValue(1);

  });

  it('brush service should be created', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service).toBeTruthy();
  });

  it('should add point to the current polyline', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown'));
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('ellipse', 'svg');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cx', '10');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'cy', '12');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'ry', (sw / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'rx', (sw / 2).toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke', 'none');

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `10 12`);
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('ellipse');
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('polyline');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
  });

  it('should NOT be able add point to the current polyline if a mousedown is not registered before', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    rendererSpy.setAttribute.calls.reset();
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalled();
  });

  it('should remove dot and add the polyline on the first move', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown'));
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    expect(drawingServiceSpy.removeObject).toHaveBeenCalled();
    rendererSpy.setAttribute.calls.reset();
    drawingServiceSpy.addObject.calls.reset();
    drawingServiceSpy.removeObject.calls.reset();
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
  });

  it('should create an object with good color on left click', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;
    const setColorsSpy = spyOn(service, 'setColors');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));

    expect(setColorsSpy).toHaveBeenCalledWith({ r: 0, g: 0, b: 0 }, 0, 'ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(setColorsSpy).toHaveBeenCalledWith({ r: 255, g: 255, b: 255 }, 1, 'ellipse');
  });

  it('should return null if strokewidth is equal to 0', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(0);

    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
  });

  it('should return the texture', () => {
    const defs: SVGDefsElement = document.createElementNS('svg', 'defs') as SVGDefsElement;
    const pattern: SVGPatternElement = document.createElementNS('svg', 'pattern') as SVGPatternElement;
    pattern.setAttribute('id', '1');
    defs.appendChild(pattern);
    textureServiceSpy.getTextureElement.and.returnValue(defs);
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown'));
    service.onMove(new MouseEvent('mousemove'));
    service.onRelease(new MouseEvent('mouseup'));
    expect(rendererSpy.setStyle).toHaveBeenCalledWith('polyline', 'stroke', 'url(#1)');
  });

  it('should do nothing on onKeyUp', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service.onKeyUp(new KeyboardEvent('keyup'))).toBeUndefined();
  });

  it('should do nothing on onKeyDown', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    expect(service.onKeyDown(new KeyboardEvent('keydown'))).toBeUndefined();
  });

  it('should do nothing if mouse button is not left or right', () => {
    const service: BrushToolService = TestBed.get(BrushToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });
});
