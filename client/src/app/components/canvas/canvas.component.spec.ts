import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingService } from '../../services/drawing/drawing.service';
import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', ['']);
    TestBed.configureTestingModule({
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
      declarations: [CanvasComponent],
    });
    drawingServiceSpy = TestBed.get(DrawingService);
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return dimension value when service created value is true', () => {
    drawingServiceSpy.isCreated = true;
    drawingServiceSpy.height = 100;
    drawingServiceSpy.width = 100;
    expect(component.height).toEqual(100);
    expect(component.width).toEqual(100);
  });
  it('should return 0 when service created value is false ', () => {
    drawingServiceSpy.isCreated = false;
    expect(component.height).toEqual(0);
    expect(component.width).toEqual(0);
  });

  it('should return background alpha value', () => {
    drawingServiceSpy.alpha = 9;
    expect(component.backgroundAlpha).toEqual(9);
  });

  it('should return drawingServicecolor value', () => {
    spyOnProperty(drawingServiceSpy, 'rgbaColorString').and.returnValue('rgba(255,0,0,1)');
    expect(component.backgroundColor).toEqual('rgba(255,0,0,1)');
  });

  it('should return value of isDrawingCreated ', () => {
    drawingServiceSpy.isCreated = true;
    expect(component.isDrawingCreated).toEqual(true);

    drawingServiceSpy.isCreated = false;
    expect(component.isDrawingCreated).toEqual(false);
  });

  it(' ngAfterView should be called ', () => {
    expect((component.canvasDiv.nativeElement as Element).innerHTML).toEqual('');

    drawingServiceSpy.svgString.emit('chaine');

    expect((component.canvasDiv.nativeElement as Element).innerHTML).toEqual('chaine');
  });

});
