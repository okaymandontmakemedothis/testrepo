import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingService } from '../../services/drawing/drawing.service';
import { CanvasComponent } from './canvas.component';
import { ToolsService } from '../../services/tools/tools.service';
let service:DrawingService;

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  let toolSpy : jasmine.SpyObj<ToolsService>;



  //let toolservice: ToolsServiceStub;//ToolsService;

  //let spy:any;
 //const spy = jasmine.createSpyObj('ToolsService',['isPressed']);

  beforeEach(async(() => {
     // const spy = jasmine.createSpyObj('ToolsService',['onPressed']);
    service= new DrawingService();
    TestBed.configureTestingModule({

      providers:[{provide:DrawingService,useValue:service}, {provide: ToolsService, useValue: toolSpy}],//ToolsServiceStub}],
      declarations: [ CanvasComponent  ],
    })
    .compileComponents();//toolSpy=TestBed.get(spy);

  }));

  beforeEach(() => {

    //toolSpy=TestBed.get(spy);
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('should return dimension',()=>{

  service.setDimension(200,98);
  expect(component.height).toEqual(service.height);
  expect(component.width).toEqual(service.width);

  })


  it ('should return background alpha',()=>{
    expect(component.backgroundAlpha).toEqual(service.alpha);
  })

  it('should return color',()=>{
    expect(component.backgroundColor).toEqual(service.rgbaColorString);
  })

  it('should return value isDrawingCreated of component',()=>{
    expect(component.isDrawingCreated).toEqual(service.created);
  })


  it('should be executed',()=> {




  })


  it('mouse return true when pressed ',()=>{

   //component.onPressed(new MouseEvent('mousedown'));
   //expect(component.isPressed).toEqual(true);
  //expect(component.onPressed).toHaveBeenCalled();
  //expect(toolSpy.onPressed).toHaveBeenCalled();
   //spy=spyOn()
  })
});


