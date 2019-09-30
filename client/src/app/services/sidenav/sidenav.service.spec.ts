import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule, } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeDialogModule } from 'src/app/components/welcome-dialog/welcome-dialog.module';
import { HotkeysFichierService } from '../hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from '../hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from '../hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from '../hotkeys/hotkeys-travail/hotkeys-travail.service';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ToolsService } from '../tools/tools.service';
import { SidenavService } from './sidenav.service';
//import { EventEmitter } from '@angular/core';

describe('SidenavService', () => {
  let toggleDrawerServiceServiceSpy: jasmine.SpyObj<ToggleDrawerService>;
  let hotkeyOutilServiceSpy: jasmine.SpyObj<HotkeysOutilService>;
  let hotkeyaServiceSpy: jasmine.SpyObj<HotkeysFichierService>;
  let hotkeybServiceSpy: jasmine.SpyObj<HotkeysSelectionService>;
  let hotkeycServiceSpy: jasmine.SpyObj<HotkeysTravailService>;
  let toolServiceSpy: jasmine.SpyObj<ToolsService>;

  beforeEach(() => {
    const toogleSpy = jasmine.createSpyObj('ToggleDrawerService', ['']);
    const hotkeyOutilSpy = jasmine.createSpyObj('HotkeysOutilService', ['']);
    const hotkeyaSpy = jasmine.createSpyObj('HotkeysFichierService', ['']);
    const hotkeybSpy = jasmine.createSpyObj('HotkeysSelectionService', ['']);
    const hotkeycSpy = jasmine.createSpyObj('SidenavHotkeysTravailServiceService', ['']);
    const toolSpy = jasmine.createSpyObj('ToolsService', ['']);
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule, MatButtonToggleModule],
      providers: [ {provide: SidenavService, useValue: {}}, { provide: ToggleDrawerService, useValue: toogleSpy },
        { provide: ToolsService, useValue: toolSpy }, { provide: HotkeysOutilService, useValue: hotkeyOutilSpy },
        { provide: HotkeysFichierService, useValue: hotkeyaSpy }, { provide: HotkeysSelectionService, useValue: hotkeybSpy },
      { provide: HotkeysTravailService, useValue: hotkeycSpy }],
      });
    toggleDrawerServiceServiceSpy = TestBed.get(toggleDrawerServiceServiceSpy);
    hotkeyOutilServiceSpy = TestBed.get(hotkeyOutilServiceSpy);
    hotkeyaServiceSpy = TestBed.get(hotkeyaServiceSpy);
    hotkeybServiceSpy = TestBed.get(hotkeybServiceSpy);
    hotkeycServiceSpy = TestBed.get(hotkeycServiceSpy);
    toolServiceSpy = TestBed.get(toolServiceSpy);
    });

  it('sidenav service should be created', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    expect(service).toBeTruthy();
  });

  it('should get tool list', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    expect(service.toolList).toEqual(toolServiceSpy.tools);
  });

  it('should get isOpened', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const spy = spyOnProperty(toggleDrawerServiceServiceSpy, 'isOpened').and.returnValue(true);
    expect(service.isOpened).toEqual(spy);
  });

  it('should get tool list length when selectedParameter is called and isControlMenu is true', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = true;
    service.toolList.length = 4;
    expect(service.selectedParameter).toEqual(4);
  });

  it('should get tool list selected tools id when selectedParameter is called and isControlMenu is false', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = false;
    toolServiceSpy.selectedToolId = 4;
    expect(service.selectedParameter).toEqual(4);
  });

  it('should open', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(toggleDrawerServiceServiceSpy, 'open').and.callThrough();
    service.open();
    expect(toggleDrawerServiceServiceSpy.open).toHaveBeenCalled();
  });

  it('should close', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(toggleDrawerServiceServiceSpy, 'close').and.callThrough();
    service.close();
    expect(toggleDrawerServiceServiceSpy.close).toHaveBeenCalled();
  });

  it('should openControlMenu', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    spyOn(service, 'open').and.callThrough();
    service.openControlMenu();
    expect(service.open).toHaveBeenCalled();
    expect(service.isControlMenu).toEqual(true);
  });

  it('should call eventListenerOnInput and execute hotkeys if canClick is true', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const mouseEvent = new MouseEvent('mousedown');
    service.canClick = true;
    window.dispatchEvent(mouseEvent);
    expect(hotkeyOutilServiceSpy.canExecute).toEqual(true);
    expect(hotkeyaServiceSpy.canExecute).toEqual(true);
    expect(hotkeybServiceSpy.canExecute).toEqual(true);
    expect(hotkeycServiceSpy.canExecute).toEqual(true);
  });

  /*it('should call eventListenerOnInput and not execute hotkeys if target is not undefined', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const mouseEvent = new MouseEvent('mousedown');
    spyOnProperty(mouseEvent, 'target').and.returnValue( as HTMLInputElement);
    mouseEvent.target: HTMLInputElement
    window.dispatchEvent(mouseEvent);
    expect(hotkeyOutil.canExecute).toEqual(false);
    expect(hotkeya.canExecute).toEqual(false);
    expect(hotkeyb.canExecute).toEqual(false);
    expect(hotkeyc.canExecute).toEqual(false);
  });*/
});
