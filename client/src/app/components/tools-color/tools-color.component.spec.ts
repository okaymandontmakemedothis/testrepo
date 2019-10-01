import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsColorComponent } from './tools-color.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material';
import { ToolsColorService } from 'src/app/services/tools-color/tools-color.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolsColorComponent', () => {
  let component: ToolsColorComponent;
  let fixture: ComponentFixture<ToolsColorComponent>;
  let toolsColorServiceSpy: jasmine.SpyObj<ToolsColorService>;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
    updatePosition: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    const spyToolsColor = jasmine.createSpyObj('ToolsColorService', ['switchColor', 'setPrimaryColor', 'setSecondaryColor']);
    TestBed.configureTestingModule({
      declarations: [ToolsColorComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ToolsColorService, useValue: spyToolsColor }],
    });
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    toolsColorServiceSpy = TestBed.get(ToolsColorService);
    fixture = TestBed.createComponent(ToolsColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call switchColor', () => {
    component.switchColor();
    expect(toolsColorServiceSpy.switchColor).toHaveBeenCalled();
  });

  it('should call clickPrimary;', () => {
    const spy = spyOn(component, 'openDialog');
    component.clickPrimary(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call clickSecondary', () => {
    const spy = spyOn(component, 'openDialog');
    component.clickSecondary(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call clickBackground', () => {
    const spy = spyOn(component, 'openDialog');
    component.clickBackground(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });


  it('should open PrimaryColorDialog', () => {
    component.openDialog(0);
    expect(toolsColorServiceSpy.setPrimaryColor).toHaveBeenCalled();
  });


  it('should open SecondaryColorDialog', () => {
    component.openDialog(1);
    expect(toolsColorServiceSpy.setSecondaryColor).toHaveBeenCalled();
  });
});
