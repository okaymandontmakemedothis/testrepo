import { TestBed } from '@angular/core/testing';
import { GridService } from './grid.sevice';
import { DrawingService } from '../../drawing/drawing.service';
import { FormControl } from '@angular/forms';
import { Renderer2 } from '@angular/core';

describe('GridService', () => {
    let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
    let rendererSpy: jasmine.SpyObj<Renderer2>;
    beforeEach(() => {
        rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle',]);
        let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject']);
        spyDrawingService = {
            ...spyDrawingService,
            renderer: rendererSpy,
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: DrawingService, useValue: spyDrawingService },
            ],
        });
        drawingServiceSpy = TestBed.get(DrawingService);
        drawingServiceSpy.addObject.and.returnValue(1);
    });

    it('should be created', () => {
        const service: GridService = TestBed.get(GridService);
        expect(service).toBeTruthy();
    });

    it('should do nothing on onPressed', () => {
        const service: GridService = TestBed.get(GridService);
        const mouseEvent = new MouseEvent('mousedown');
        expect(service.onPressed(mouseEvent)).toBeUndefined();
    });

    it('should do nothing on OnRelease', () => {
        const service: GridService = TestBed.get(GridService);
        const mouseEvent = new MouseEvent('mouseup');
        expect(service.onRelease(mouseEvent)).toBeUndefined();
    });

    it('should do nothing on onMove', () => {
        const service: GridService = TestBed.get(GridService);
        const moveEvent = new MouseEvent('mousemove', { movementX: 2, movementY: 2 });
        expect(service.onMove(moveEvent)).toBeUndefined();
    });

    it('should do nothing on onKeyUp', () => {
        const service: GridService = TestBed.get(GridService);
        expect(service.onKeyUp(new KeyboardEvent('keyup'))).toBeUndefined();
    });

    it('should do nothing on onKeyDown', () => {
        const service: GridService = TestBed.get(GridService);
        expect(service.onKeyDown(new KeyboardEvent('keydown'))).toBeUndefined();
    });

    it('should change color of grid if the function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        service.createPatternGrid();
        const color: string = (service.parameters.get('color') as FormControl).value;
        service.changeColor();
        expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke', color);
    });
    it('should change opacity of grid if the function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        service.createPatternGrid();
        const transparence: number = (service.parameters.get('transparence') as FormControl).value;
        service.changeOpacity();
        expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'stroke-opacity', transparence.toString());
    });

    it('should hide grid if the function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        service.createPatternGrid();

        service.hideGrid();
        expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'visibility', 'hidden');
    });

    it('should show grid if the function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        service.createPatternGrid();

        service.showGrid();
        expect(drawingServiceSpy.renderer.setStyle).toHaveBeenCalledWith('rect', 'visibility', 'visible');
    });

    it('should change size of grid if the function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        service.createPatternGrid();
        const sc: number = (service.parameters.get('sizeCell') as FormControl).value;
        service.changeGridSize();
        expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('pattern', 'width', sc.toString());
        expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('pattern', 'height', sc.toString());
        expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'width', sc.toString());
        expect(drawingServiceSpy.renderer.setAttribute).toHaveBeenCalledWith('rect', 'height', sc.toString());
    });

    it('should create pattern grid when function is called', () => {
        const service: GridService = TestBed.get(GridService);
        rendererSpy.createElement.withArgs('defs', 'svg').and.returnValue('defs');
        rendererSpy.createElement.withArgs('pattern', 'svg').and.returnValue('pattern');
        rendererSpy.createElement.withArgs('rect', 'svg').and.returnValue('rect');
        const sc: number = (service.parameters.get('sizeCell') as FormControl).value;
        const spy = spyOn(service as any, 'setStyle');
        const x = 0;
        const y = 0;
        service.createPatternGrid();
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('pattern', 'x', x.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('pattern', 'y', y.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('pattern', 'width', sc.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('pattern', 'height', sc.toString());

        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'x', x.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'y', y.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'width', sc.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'height', sc.toString());

        expect(spy).toHaveBeenCalled();
        expect(drawingServiceSpy.renderer.appendChild).toHaveBeenCalledWith('defs', 'pattern');
        expect(drawingServiceSpy.renderer.appendChild).toHaveBeenCalledWith('pattern', 'rect');

        expect(rendererSpy.createElement).toHaveBeenCalledWith('rect', 'svg');
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'width', service.screenSizeX.toString());
        expect(rendererSpy.setAttribute).toHaveBeenCalledWith('rect', 'height', service.screenSizeY.toString());
        expect(drawingServiceSpy.addObject).toHaveBeenCalled();
        expect(drawingServiceSpy.addObject).toHaveBeenCalled();
    });

});
