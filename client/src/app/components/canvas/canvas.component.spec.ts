import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingService } from '../../services/drawing/drawing.service';
import { CanvasComponent } from './canvas.component';


let drawingservice:DrawingService;

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {

    drawingservice= new DrawingService();
    TestBed.configureTestingModule({

      providers:[{provide:DrawingService,useValue:drawingservice}],
      declarations: [ CanvasComponent  ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('should return dimension value when service created value is true',()=>{

    drawingservice.isCreated =true;
    drawingservice.height=100;
    drawingservice.width=98;
    expect(component.height).toEqual(drawingservice.height);
    expect(component.width).toEqual(drawingservice.width);


  })
  it ('should return 0 when service created value is false ',()=>{

    drawingservice.isCreated=false;

    expect(component.height).toEqual(0);
    expect(component.width).toEqual(0);
  })


  it ('should return background alpha',()=>{
    drawingservice.alpha =9;
    expect(component.backgroundAlpha).toEqual(drawingservice.alpha);
  })

  it('should return drawingServicecolor value',()=>{
    //service.rgbaColorString ={};
    drawingservice.color= { r: 200, g: 200, b: 200 };
    expect(component.backgroundColor).toEqual(drawingservice.rgbaColorString);
  })

  it('should return value of isDrawingCreated ',()=>{
    drawingservice.isCreated =true;
    expect(component.isDrawingCreated).toEqual(drawingservice.isCreated);

    drawingservice.isCreated=false;
    expect(component.isDrawingCreated).toEqual(drawingservice.isCreated);

  })





});

