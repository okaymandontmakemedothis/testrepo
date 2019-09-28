import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingService } from '../../services/drawing/drawing.service';
import { CanvasComponent } from './canvas.component';

import { ToolsService } from '../../services/tools/tools.service';
//////////////
import { PencilToolService } from '../../services/tools/pencil-tool/pencil-tool.service';
import { BrushToolService } from '../../services/tools/brush-tool/brush-tool.service';
import { ToolsApplierColorsService } from '../../services/tools/tools-applier-colors/tools-applier-colors.service';
import { ToolRectangleService } from '../../services/tools/tool-rectangle/tool-rectangle.service';
import { ToolsColorService } from '../../services/tools-color/tools-color.service';
import { OffsetManagerService } from '../../services/offset-manager/offset-manager.service';



///////////////
let colorTool:  ToolsColorService;
let pencilTool: PencilToolService;
let   brushTool:  BrushToolService;
let  colorApplicator:  ToolsApplierColorsService;
let   rectangleTool: ToolRectangleService;
let    offsetManager: OffsetManagerService;
//-----------------------------------
let service:DrawingService;
let toolservice: ToolsServiceStub;
  class ToolsServiceStub extends ToolsService{

    constructor(){super(service,colorTool,offsetManager,pencilTool,brushTool,colorApplicator,rectangleTool);}

  }
describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;


  //let service:DrawingService;
  //let toolservice: ToolsServiceStub;//ToolsService;

 // let spy:any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[DrawingService, {provide: ToolsService, useValue: ToolsServiceStub}],
      declarations: [ CanvasComponent  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    service= new DrawingService();
   // toolservice = new inutile();
     toolservice=new ToolsServiceStub();
    component= new CanvasComponent(service, toolservice);//toolservice);
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


  it('mouse return true when pressed ',()=>{

  spyOn(toolservice,'onPressed').and.callFake;//.returnValue(true);
  //spyOn(component,'onPressed').and.callThrough;//.callFake;

  expect(toolservice.onPressed).toHaveBeenCalled();
  expect(component.isPressed).toEqual(true)  ;
  })
});
