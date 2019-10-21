import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { LineToolService } from './line-tool.service';
//import { INITIAL_WIDTH } from '../tools-constants';
describe('LineToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  //let lineSpy: jasmine.SpyObj<LineToolService>;
  beforeEach(() => {
   const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle',
    'addObject' ]);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };
  /*  lineSpy = jasmine.createSpyObj('LineToolService',['onPressed','onRelease','onMove',
    'onKeyUp','onKeyDown','changeTool','selectStyleJonction','selectStyleMotif']);
    lineSpy = {
      ...lineSpy,
      object: null;
    }*/

    TestBed.configureTestingModule({
      providers: [
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: OffsetManagerService, useValue: spyOffset },
        { provide: ToolsColorService, useValue: spyColor },
      ],
    });

    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
    colorToolServiceSpy = TestBed.get(ToolsColorService);
    drawingServiceSpy = TestBed.get(DrawingService);
    drawingServiceSpy.addObject.and.returnValue(1);
    colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
    colorToolServiceSpy.primaryAlpha = 0;
    colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
    colorToolServiceSpy.secondaryAlpha = 1;
  });

  it('line service should be created', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    expect(service).toBeTruthy();
  });
  /*it('---------------------------line service should be executed', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
        service.onPressed(new MouseEvent('mousedown'));
        rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown'));
    //const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('circle', 'svg');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
  //  drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(service).toBeTruthy();
  });*/

  it('should return null if object exist', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    setTimeout(() => {}, 10 );
    //offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    //
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    setTimeout(() => {}, 10 );
    //offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(service).toBeTruthy();
  });

  it('-------------------------------------should be created', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    drawingServiceSpy.removeObject(0);
    expect(drawingServiceSpy.removeObject).toHaveBeenCalled();
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );
    expect(service).toBeTruthy();
  });

  /*it('should remove dot and add the polyline on the first move', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    //rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    //rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown'));
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
   /* rendererSpy.setAttribute.calls.reset();
    drawingServiceSpy.addObject.calls.reset();
    drawingServiceSpy.removeObject.calls.reset();
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
  });*/


  it('should define marker',() => {
    const service: LineToolService = TestBed.get(LineToolService);
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    //const circle = rendererSpy.createElement.withArgs('circle','svg');//.and.returnValue('circle');

   // expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('circle', 'svg');

///continuer

  });
  it('should add point to the current polyline', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const form = service.parameters.get('rectStyleMotif') as FormControl;
    form.patchValue('ligne');
    service.onPressed(new MouseEvent('mousedown'));

    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    let markerId = 0;
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

    //markerId ++;
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
  // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');
   //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke',colorToolServiceSpy.primaryColor);

   //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('circle','fillOpacity','0');
  //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-linecap', 'round');
    //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-linejoin','round');
    //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');

   /* expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('ellipse', 'rx', (sw / 2).toString());
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('ellipse', 'stroke', 'none');

    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `10 12`);
    expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('ellipse');
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('polyline');
*/
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
    //rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    /*rendererSpy.createElement.withArgs('defs', 'svg');
    service.onPressed(new MouseEvent('mousedown'));
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    const diameter: number = (service.parameters.get('diameter') as FormControl).value;
    const motif: number = (service.parameters.get('rectStyleMotif') as FormControl).value;
    const jonction: number = (service.parameters.get('rectStyleJonction') as FormControl).value;*/
    /*expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('ellipse', 'svg');
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
    service.onMove(moveEvent);*/
  });

  /*it('should NOT be able add point to the current polyline', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    rendererSpy.setAttribute.calls.reset();
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalled();
  });*/
/*
  it('should remove dot and add the polyline on the first move', () => {
    const service: LineToolService = TestBed.get(LineToolService);
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
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const setColorsSpy = spyOn(service, 'setColors');

    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(rendererSpy.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
    expect(setColorsSpy).toHaveBeenCalledWith({ r: 0, g: 0, b: 0 }, 0, 'ellipse');

    service.onPressed(new MouseEvent('mousedown', { button: 2 }));

    expect(setColorsSpy).toHaveBeenCalledWith({ r: 255, g: 255, b: 255 }, 1, 'ellipse');

  });
*/
  it('should return null if strokewidth is equal to 0', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(0);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();

  });
  it('should add point to the current polyline ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();


  });
  it('should add point to the current polyline ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    //service.onPressed(new MouseEvent('mousedown'));
    //expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');


  });
/*
  it('should do nothing on onKeyUp', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    expect(service.onKeyUp(new KeyboardEvent('keyup'))).toBeUndefined();
  });

  it('should do nothing on onKeyDown', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    expect(service.onKeyDown(new KeyboardEvent('keydown'))).toBeUndefined();
  });

  it('should do nothing if mouse button is not left or right', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });*/
  it('should select stylemotif ligne', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const form = service.parameters.get('rectStyleMotif') as FormControl;
    form.patchValue('ligne');
    service.onPressed(new MouseEvent('mousedown'));

    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    let markerId = 0;
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

    //markerId ++;
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
  // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');


  });
  it('should select stylemotif pointille-trait', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const form = service.parameters.get('rectStyleMotif') as FormControl;
    form.patchValue('pointille-trait');
    service.onPressed(new MouseEvent('mousedown'));

    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    let markerId = 0;
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

    //markerId ++;
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
  // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','16');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');



  });

  it('should select stylemotif pointille-point', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const form = service.parameters.get('rectStyleMotif') as FormControl;

    form.patchValue('pointille-point');
    service.onPressed(new MouseEvent('mousedown'));

    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    let markerId = 0;
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

    //markerId ++;
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
  // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','1 12');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');



  });

  it('should select stylejonction avec point et en angle', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    const form = service.parameters.get('rectStyleJonction') as FormControl;

    form.patchValue('en angle');
    service.onPressed(new MouseEvent('mousedown'));

    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');
    let markerId = 0;
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

    //markerId ++;
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
  // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');

   form.patchValue('avec point');
   service.onPressed(new MouseEvent('mousedown'));


   expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polyline', 'svg');

   expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-start', `url(#Marker${markerId})`);
   expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-mid', `url(#Marker${markerId})`);
   expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'marker-end', `url(#Marker${markerId})`);

   //markerId ++;
   expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());
 // expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', `${10} ${20}`);
  expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');
  expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');
  expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','fill','none');


  });
 /* it('should select stylemotif pointille-point', () => {
    let service: LineToolService = TestBed.get(LineToolService);
    const StrokeWidth = new FormControl(INITIAL_WIDTH);
    const Diameter = new FormControl(3 * INITIAL_WIDTH);
    let StyleMotif = new FormControl('pointille-point');
    const StyleJonction = new FormControl('arrondi');





    //ajouter les attributs en relation avec le marqueur

    const markerDefs = rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    const marker = rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');

        rendererSpy.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith(marker, 'markerUnits', 'userSpaceOnUse');

    drawingServiceSpy.renderer.setAttribute(marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());
    drawingServiceSpy.renderer.setAttribute(marker, 'markerWidth', ((service.parameters.get('diameter') as FormControl).value).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'markerHeight', ((service.parameters.get('diameter') as FormControl).value).toString());

     const id  = 0;
    drawingServiceSpy.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    expect(drawingServiceSpy.renderer.setProperty).toHaveBeenCalledWith
    (marker, 'id', 'Marker0');
    drawingServiceSpy.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    drawingServiceSpy.renderer.setAttribute
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'viewBox',
      `0 0 ${((service.parameters.get('diameter') as FormControl).value)} ${((service.parameters.get('diameter') as FormControl).value)}`);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refX', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith
    (marker, 'refY', (((service.parameters.get('diameter') as FormControl).value) / 2).toString());

    const  circle = rendererSpy.createElement.withArgs('circle', 'svg');//.and.returnValue('circle');
    rendererSpy.setAttribute(circle, 'cx', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'cy', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'r', (service.parameters.get('diameter') as FormControl).value.toString());
    rendererSpy.setAttribute(circle, 'visibility', 'hidden');

    rendererSpy.appendChild(markerDefs, marker);

    rendererSpy.appendChild(marker, circle);

    drawingServiceSpy.addObject(markerDefs);

    /////////////---------------------------------------////////////////////////////
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });

    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');

    ///tester style motif ligne
    service.parameters = new FormGroup({
      strokeWidth: StrokeWidth,
      diameter: Diameter,
      rectStyleMotif: StyleMotif,
      rectStyleJonction: StyleJonction,
    });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline','stroke-dasharray','');



  });*/
});
