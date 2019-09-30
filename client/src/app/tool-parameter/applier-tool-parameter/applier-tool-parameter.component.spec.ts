import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { ToolsColorService } from 'src/app/services/tools-color/tools-color.service';
import { ToolsApplierColorsService } from 'src/app/services/tools/tools-applier-colors/tools-applier-colors.service';
import { ApplierToolParameterComponent } from './applier-tool-parameter.component';

describe('ApplierToolParameterComponent', () => {
  let component: ApplierToolParameterComponent;
  let fixture: ComponentFixture<ApplierToolParameterComponent>;
  const colorService: ToolsColorService = new ToolsColorService();
  const drawingService: DrawingService = new DrawingService();
  const applierService: ToolsApplierColorsService = new ToolsApplierColorsService(drawingService, colorService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplierToolParameterComponent ],
      providers: [{ provide: ToolsApplierColorsService, useValue: applierService }, { provide: DrawingService, useValue: drawingService },
        {provide: ToolsColorService, useValue: drawingService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplierToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get tool name', () => {
    applierService.toolName = 'applier';
    expect(component.toolName).toEqual('applier');
  });
});
