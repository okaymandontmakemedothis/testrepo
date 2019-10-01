import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsColorComponent } from './tools-color.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ToolsColorService } from 'src/app/services/tools-color/tools-color.service';

describe('ToolsColorComponent', () => {
  let component: ToolsColorComponent;
  let fixture: ComponentFixture<ToolsColorComponent>;
  let toolsColorServiceSpy: jasmine.SpyObj<ToolsColorService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsColorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatDialog,
        { provide: Overlay, useValue: ['position, scrollStrategies'] },
        { provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: [] },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const spyToolsColor = jasmine.createSpyObj('ToolsColorService', ['switchColor', 'setPrimaryColor', 'setSecondaryColor']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ToolsColorService, useValue: spyToolsColor },
      ],
    });

    toolsColorServiceSpy = TestBed.get(ToolsColorService);

    fixture = TestBed.createComponent(ToolsColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call switchColor', () => {
    const spy = spyOn(toolsColorServiceSpy, 'switchColor');
    component.switchColor();
    expect(spy).toHaveBeenCalled();
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


  it('should call clickBackground', () => {
    const spy = spyOn(toolsColorServiceSpy, 'setPrimaryColor');
    component.openDialog(0);
    expect(spy).toHaveBeenCalled();
  });
  it('should call clickBackground', () => {
    const spy = spyOn(toolsColorServiceSpy, 'setSecondaryColor');
    component.openDialog(1);
    expect(spy).toHaveBeenCalled();
  });
});
