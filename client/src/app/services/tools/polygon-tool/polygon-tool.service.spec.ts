// import { Renderer2 } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { FormControl } from '@angular/forms';
// import { DrawingService } from '../../drawing/drawing.service';
// import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
// import { ToolsColorService } from '../../tools-color/tools-color.service';
// import { PolygonToolService } from './polygon-tool.service';

// describe('PolygonToolService', () => {
//   let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;
//   let colorToolServiceSpy: jasmine.SpyObj<ToolsColorService>;
//   let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
//   let rendererSpy: jasmine.SpyObj<Renderer2>;

//   beforeEach(() => {
//     rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
//     const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
//     const spyColor = jasmine.createSpyObj('ToolsColorService', ['']);
//     let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
//     spyDrawingService = {
//       ...spyDrawingService,
//       renderer: rendererSpy,
//     };

//     TestBed.configureTestingModule({
//       providers: [Renderer2,
//         { provide: DrawingService, useValue: spyDrawingService },
//         { provide: OffsetManagerService, useValue: spyOffset },
//         { provide: ToolsColorService, useValue: spyColor },
//       ],
//     });

//     drawingServiceSpy = TestBed.get(DrawingService);
//     offsetManagerServiceSpy = TestBed.get(OffsetManagerService);
//     colorToolServiceSpy = TestBed.get(ToolsColorService);
//     drawingServiceSpy.addObject.and.returnValue(1);

//     colorToolServiceSpy.primaryColor = { r: 0, g: 0, b: 0 };
//     colorToolServiceSpy.primaryAlpha = 0;
//     colorToolServiceSpy.secondaryColor = { r: 255, g: 255, b: 255 };
//     colorToolServiceSpy.secondaryAlpha = 1;
//   });

//   it('tool-polygon service should be created', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     expect(service).toBeTruthy();
//   });

//   it('should create un object on mouse press ', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });

//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');

//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     const sw: number = (service.parameters.get('strokeWidth') as FormControl).value;

//     expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('rect', 'svg');
//     expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('rect');

//     expect(drawingServiceSpy.renderer.createElement).toHaveBeenCalledWith('polygon', 'svg');
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke-width', sw.toString());
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke-alignment', 'outer');
//     expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('polygon');

//     const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
//     service.onMove(moveEvent);
//   });

//   it('should not addObject if contour doesnt exist ', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 10 });
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     expect(drawingServiceSpy.addObject).not.toHaveBeenCalledWith('rect');

//   });

//   it('should create an object with good color on both click when polygonStyle is center', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     (service.parameters.get('polygonStyle') as FormControl).patchValue('center');
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');

//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
//     `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());

//     service.onPressed(new MouseEvent('mousedown', { button: 2 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
//     `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity',
//       colorToolServiceSpy.secondaryAlpha.toString());
//   });

//   it('should create an object with good color on both click when polygonStyle is border', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     (service.parameters.get('polygonStyle') as FormControl).patchValue('border');
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
//       `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
//       colorToolServiceSpy.secondaryAlpha.toString());

//     service.onPressed(new MouseEvent('mousedown', { button: 2 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
//       `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
//       colorToolServiceSpy.primaryAlpha.toString());
//   });

//   it('should create an object with good color on both click when polygonStyle is fill', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     (service.parameters.get('polygonStyle') as FormControl).patchValue('fill');
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');

//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
//       `rgb(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
//       `rgb(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity', colorToolServiceSpy.primaryAlpha.toString());
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
//       colorToolServiceSpy.secondaryAlpha.toString());

//     service.onPressed(new MouseEvent('mousedown', { button: 2 }));

//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fill',
//       `rgba(${colorToolServiceSpy.secondaryColor.r},${colorToolServiceSpy.secondaryColor.g},${colorToolServiceSpy.secondaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'fillOpacity',
//       colorToolServiceSpy.secondaryAlpha.toString());
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'stroke',
//       `rgba(${colorToolServiceSpy.primaryColor.r},${colorToolServiceSpy.primaryColor.g},${colorToolServiceSpy.primaryColor.b})`);
//     expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('polygon', 'strokeOpacity',
//       colorToolServiceSpy.primaryAlpha.toString());
//   });

//   it('should be undefined if case id default', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     (service.parameters.get('polygonStyle') as FormControl).patchValue('');
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     expect(service.onPressed(new MouseEvent('mousedown', { button: 0 }))).toBeUndefined();
//   });

//   it('should do nothing if mouse button is not left or right', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 10, y: 12 });
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 1 }));
//     expect(rendererSpy.createElement).not.toHaveBeenCalled();
//   });

//   it('should not call add object if object is undefined onMove', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
//     const setSizeSpy = spyOn(service as any, 'setSize');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     service.onRelease(new MouseEvent('mouseup'));
//     drawingServiceSpy.addObject.calls.reset();

//     service.onMove(moveEvent);
//     expect(drawingServiceSpy.addObject).not.toHaveBeenCalled();
//     expect(setSizeSpy).not.toHaveBeenCalled();
//   });

//   it('should call remove object if object exist onRelease', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     service.onRelease(new MouseEvent('mouseup'));
//     expect(drawingServiceSpy.removeObject).toHaveBeenCalled();

//   });

//   it('should not call remove object if object is undefined onRelease', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     service.onRelease(new MouseEvent('mouseup'));

//     expect(drawingServiceSpy.removeObject).not.toHaveBeenCalled();
//   });

//   it('should set size of object on mouse move', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     const setSizeSpy = spyOn(service as any, 'setSize');
//     service.onMove(moveEvent);
//     expect(drawingServiceSpy.addObject).toHaveBeenCalledWith('polygon');
//     expect(setSizeSpy).toHaveBeenCalledWith(0, 0);
//   });

//   it('should set correct points and transform attributes of object on mouse move if width > 0 and height > 0', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 101, y: 102 });
//     (service.parameters.get('vertexNumber') as FormControl).patchValue(3);
//     (service.parameters.get('strokeWidth') as FormControl).patchValue(1);
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 298, y: 298 });
//     const moveEvent = new MouseEvent('mousemove', { movementX: undefined, movementY: undefined });
//     service.onMove(moveEvent);
//     expect(rendererSpy.setAttribute).toHaveBeenCalledWith('polygon', 'points',
//     '198.99999999999997,104 282.1384387633061,248 115.86156123669389,248 ');
//     expect(rendererSpy.setAttribute).toHaveBeenCalledWith('polygon', 'transform',
//     'scale(1.1667286689873686,1.1667286689873686) translate (-29.294733246034937,-13.623250979827164)');
//   });

//   it('should set correct points and transform attributes of object on mouse move if width < 0 and height < 0', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 201, y: 200 });
//     (service.parameters.get('vertexNumber') as FormControl).patchValue(3);
//     (service.parameters.get('strokeWidth') as FormControl).patchValue(1);
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 98, y: 101 });
//     const moveEvent = new MouseEvent('mousemove', { movementX: undefined, movementY: undefined });
//     service.onMove(moveEvent);
//     expect(rendererSpy.setAttribute).toHaveBeenCalledWith('polygon', 'points',
//     '149.5,99 192.3682574873297,173.25 106.63174251267029,173.25 ');
//     expect(rendererSpy.setAttribute).toHaveBeenCalledWith('polygon', 'transform',
//     'scale(1.1780278219828728,1.1780278219828728) translate (-21.74410392389859,0.5746222134092953)');
//   });

//   it('should not draw anything if size < 0', () => {
//     const service: PolygonToolService = TestBed.get(PolygonToolService);
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
//     (service.parameters.get('vertexNumber') as FormControl).patchValue(3);
//     (service.parameters.get('strokeWidth') as FormControl).patchValue(1);
//     rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
//     rendererSpy.createElement.withArgs('polygon', 'svg').and.returnValue('polygon');
//     service.onPressed(new MouseEvent('mousedown', { button: 0 }));
//     offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 2, y: 2 });
//     const moveEvent = new MouseEvent('mousemove', { movementX: undefined, movementY: undefined });
//     service.onMove(moveEvent);
//     // expect(rendererSpy.setAttribute).not.toHaveBeenCalledWith('polygon', 'points',
//     // '149.5,99 192.3682574873297,173.25 106.63174251267029,173.25 ');
//     // expect(rendererSpy.setAttribute).toHaveBeenCalledWith('polygon', 'transform',
//     // 'scale(1.1780278219828728,1.1780278219828728) translate (-21.74410392389859,0.5746222134092953)');
//   });
// });
