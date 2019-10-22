import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DrawingService } from '../../drawing/drawing.service';
import { KeyCodes } from '../../hotkeys/hotkeys-constants';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { LineToolService } from './line-tool.service';

describe('LineToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
  let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
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

   TestBed.configureTestingModule({
      providers: [LineToolService,
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
  it('should return null if object exist', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    setTimeout(() => {return; }, 10 );
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));

    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    setTimeout(() => {return; }, 10 );
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(service).toBeTruthy();
  });

  it('should not execute onDoublePressed', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );

    setTimeout(() => {return; },
    250);
    service.onRelease(new MouseEvent('mouseup'));
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();

  });
  it('should execute onDoublePressed', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
  });

  it('should execute onDoublePressed with shift', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');

    // faire un double clic
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );
    // presser le shift
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true});
    expect(service.onKeyDown(eventKeyDown)).toBeUndefined();

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown') );
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
  });

  it('should pressed with button 1', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown', {button: 0}) );

    expect(drawingServiceSpy.addObject).toHaveBeenCalled();

    service.onPressed(new MouseEvent('mousedown', {button: 1}) );

    expect(drawingServiceSpy.addObject).toHaveBeenCalled();

  });

  it('should add point to the current polyline if bouton pressed is 0', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    service.onPressed(new MouseEvent('mousedown'));
    service.onRelease(new MouseEvent('mouseup'));
    rendererSpy.setAttribute.calls.reset();
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
  });

  it('should return null if bouton pressed equal 1', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(0);
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();

  });

  it('should not add object if strokewidth is equal to 0', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(0);
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    expect(service.parameters.get('strokeWidth')as FormControl).toEqual(form);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();

  });
  it('should add point to the current polyline ', () => {

    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();

    expect(rendererSpy.setAttribute).toHaveBeenCalled();

    expect(drawingServiceSpy.renderer.appendChild).toHaveBeenCalled();
  });
  it('should do nothing on OnRelease', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeUndefined();
  });
  it('should move  the current polyline if object exist ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);

    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onPressed(new MouseEvent('mousedown', { button: 0 })); // creer l'objet

    service.onMove(moveEvent);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();
    expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('polyline', 'points', '100 12');
  });
  it('should not move  the current polyline  ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
    service.onMove(moveEvent);
    expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalledWith();
  });
  it('should execute onKeyUp if event is shiftKey', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: true });
    const spy = spyOn(service, 'onKeyUp');
    service.onKeyUp(eventKeyUp);
    expect(spy).toHaveBeenCalled();
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalledWith();
  });
  it('should not execute onKeyUp if event is not shiftKey', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    const eventKeyUp = new KeyboardEvent('keyup', { shiftKey: false });
    const spy = spyOn(service, 'onKeyUp');
    service.onKeyUp(eventKeyUp);
    expect(spy).toHaveBeenCalled();
    expect(service.onKeyUp(eventKeyUp)).toBeUndefined();
  });
  it('should do nothing on onKeyUp if keyboard is not pressed', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    expect(service.onKeyUp(new KeyboardEvent('keyup'))).toBeUndefined();
   });

  it('should do nothing on onKeyDown if keyboard not pressed and object do not exist ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalledWith();
    expect(service.onKeyDown(new KeyboardEvent('keydown'))).toBeUndefined();
   });

  it('should execute  onKeyDown(remove recent point ) if backSpace is pressed and object exist ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const eventKeyDown = new KeyboardEvent('keydown', { code: KeyCodes.backSpace});
    // crrer un objet avec le clic

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);

   // creer 3 points
    service.onPressed(new MouseEvent('mousedown', {button: 0}) );
    service.onRelease(new MouseEvent('mouseup', {button: 0}) );
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    service.onPressed(new MouseEvent('mousedown', {button: 0}) );
    service.onRelease(new MouseEvent('mouseup', {button: 0}) );
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 190, y: 12 });
    service.onPressed(new MouseEvent('mousedown', {button: 0}) );
    service.onRelease(new MouseEvent('mouseup', {button: 0}) );

    expect(service.onKeyDown(eventKeyDown)).toBeUndefined();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
   });

  it('should not  remove recent point ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const eventKeyDown = new KeyboardEvent('keydown', { code: KeyCodes.backSpace});
    // crrer un objet avec le clic

    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);

    service.onPressed(new MouseEvent('mousedown', {button: 0}) );
    service.onRelease(new MouseEvent('mouseup', {button: 0}) );

    expect(service.onKeyDown(eventKeyDown)).toBeUndefined();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
   });
  it('should execute  onKeyDown(eraseLine) if escape is pressed and object exist ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 5, y: 0 });
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const eventKeyDown = new KeyboardEvent('keydown', { code: KeyCodes.esc});
    // crrer un objet avec le clic

    service.onPressed(new MouseEvent('mousedown', {button: 0}) );

    service.onRelease(new MouseEvent('mouseup', {button: 0}) );

    service.onKeyDown(eventKeyDown);

    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
   });

  it('should execute  onKeyDown if shift is pressed and object exist ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const eventKeyDown = new KeyboardEvent('keydown', { shiftKey: true});
    // crrer un objet avec le clic
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();

    expect(service.onKeyDown(eventKeyDown)).toBeUndefined();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
   });

  it('should return null  if object do not exist', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    service.changeTool();
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalled();

   });

  it('should update point if object exist', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    // creer l'objet
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const form = service.parameters.get('strokeWidth') as FormControl;
    form.patchValue(4);
    expect(service.onPressed(new MouseEvent('mousedown'))).toBeUndefined();

    service.changeTool();
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    form.patchValue(0);
    service.onPressed(new MouseEvent('mousedown', { button: 0 }));
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalled();

   });

  it('should do nothing if mouse button is not left or right', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    rendererSpy.createElement.withArgs('ellipse', 'svg').and.returnValue('ellipse');
    service.onPressed(new MouseEvent('mousedown', { button: 1 }));
    expect(rendererSpy.createElement).not.toHaveBeenCalled();
  });

  it('should select stylemotif en pointille-trait', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleMotif') as FormControl;
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    form.patchValue('pointille-trait');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-dasharray', `${sw * 2}`);

  });

  it('should select stylemotif en pointille-point', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleMotif') as FormControl;
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    form.patchValue('pointille-point');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-dasharray', `1 ${sw * 1.5}`);

  });

  it('should not select stylejonction', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('null'); // renvoyer un cercle null
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleJonction') as FormControl;
    form.patchValue('en angle');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).not.toHaveBeenCalledWith();
    expect(drawingServiceSpy.renderer.setAttribute).not.toHaveBeenCalledWith();
  });

  it('should select stylejonction en angle', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleJonction') as FormControl;
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    form.patchValue('en angle');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-dasharray', '');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'fill', 'none');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'fill', 'none');

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-linecap', 'square');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-linejoin', 'miter');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('circle', 'visibility', 'hidden');
  });

  it('should select stylejonction arrondi', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleJonction') as FormControl;
    const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;
    form.patchValue('arrondi');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-width', sw.toString());

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-dasharray', '');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'fill', 'none');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'fill', 'none');

    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-linecap', 'round');
    expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polyline', 'stroke-linejoin', 'round');
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('circle', 'visibility', 'hidden');

  });

  it('should select stylejonction avec point ', () => {
    const service: LineToolService = TestBed.get(LineToolService);

    // ajouter les attributs en relation avec le marqueur
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const form = service.parameters.get('rectStyleJonction') as FormControl;
    form.patchValue('avec point');
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
    service.onPressed(new MouseEvent('mousedown'));
    expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('circle', 'visibility', 'visible');

  });

  it('should call removeRecentPoint  ', () => {
    const service: LineToolService = TestBed.get(LineToolService);
    rendererSpy.createElement.withArgs('marker', 'svg').and.returnValue('marker');
    rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
    rendererSpy.createElement.withArgs('circle', 'svg').and.returnValue('circle');
    rendererSpy.createElement.withArgs('polyline', 'svg').and.returnValue('polyline');
    const eventKeyDown = new KeyboardEvent('keydown', { code: KeyCodes.backSpace });
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 100, y: 12 });
    const spy =  spyOn(service as any, 'removeRecentPoint');
    service.onPressed(new MouseEvent('mousedown'));
    service.onKeyDown(eventKeyDown);
    expect(spy).toHaveBeenCalled();
  });

});
