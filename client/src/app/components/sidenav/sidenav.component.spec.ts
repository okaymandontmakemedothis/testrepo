import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from 'src/app/app-material.module';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
// import { BrushToolParameterComponent } from 'src/app/tool-parameter/brush-tool-parameter/brush-tool-parameter.component';
// import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';
// import { CanvasComponent } from '../canvas/canvas.component';
// import { ControlMenuComponent } from '../control-menu/control-menu.component';
// import { ParameterMenuComponent } from '../parameter-menu/parameter-menu.component';
// import { ToolsColorComponent } from '../tools-color/tools-color.component';
// import { WorkspaceComponent } from '../workspace/workspace.component';
import { SidenavComponent } from './sidenav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let sidenavServiceSpy: jasmine.SpyObj<SidenavService>;

  beforeEach(async(() => {
    let sidenavSpy = jasmine.createSpyObj('SidenavService', ['openControlMenu', 'selectionChanged', 'open', 'close', 'openControlMenu']);
    sidenavSpy = {
      ...sidenavSpy,
      isOpened: true,
    };

    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent],
      imports: [MaterialModules, FontAwesomeModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
        ],
      providers: [{ provide: SidenavService, useValue: sidenavSpy },
        {
          provide: ToolsService, useClass: class {
            selectedToolId = 1;
      } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
    sidenavServiceSpy = TestBed.get(SidenavService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sidenav component', () => {
    expect(component).toBeTruthy();
  });

  it('should get tool id', () => {
    expect(component.currentToolId).toEqual(1);
  });

  it('should get tool list', () => {
    expect(component.toolList).toEqual(sidenavServiceSpy.toolList);
  });

  it('should get isOpen', () => {
    expect(component.isOpened).toEqual(true);
  });

  it('should get selectedParameter', () => {
    expect(component.selectedParameter).toEqual(sidenavServiceSpy.selectedParameter);
  });

  it('should open', () => {
    component.open();
    expect(sidenavServiceSpy.open).toHaveBeenCalled();
  });

  it('should close', () => {
    component.close();
    expect(sidenavServiceSpy.close).toHaveBeenCalled();
  });

  it('should openControlMenu', () => {
    component.openControlMenu();
    expect(sidenavServiceSpy.openControlMenu).toHaveBeenCalled();
  });

  it('should change the selection', () => {
    const componentDebug = fixture.debugElement;
    const button = componentDebug.query(By.directive(MatButtonToggleChange));
    spyOn(component, 'selectionChanged');
    button.triggerEventHandler('change', null);
    expect(sidenavServiceSpy.selectionChanged).toHaveBeenCalled();
  });

});
