import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { WelcomeDialogModule } from 'src/app/components/welcome-dialog/welcome-dialog.module';
import { HotkeysFichierService } from '../hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from '../hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from '../hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from '../hotkeys/hotkeys-travail/hotkeys-travail.service';
import { ToggleDrawerService } from '../toggle-drawer/toggle-drawer.service';
import { ITools } from '../tools/ITools';
import { ToolsService } from '../tools/tools.service';
import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let toggleDrawerServiceSpy: jasmine.SpyObj<ToggleDrawerService>;
  let hotkeyOutilServiceSpy: jasmine.SpyObj<HotkeysOutilService>;
  let hotkeyaServiceSpy: jasmine.SpyObj<HotkeysFichierService>;
  let hotkeybServiceSpy: jasmine.SpyObj<HotkeysSelectionService>;
  let hotkeycServiceSpy: jasmine.SpyObj<HotkeysTravailService>;
  let toolServiceSpy: jasmine.SpyObj<ToolsService>;

  beforeEach(() => {
    const toogleSpy = jasmine.createSpyObj('ToggleDrawerService', ['open', 'close']);
    const hotkeyOutilSpy = jasmine.createSpyObj('HotkeysOutilService', ['']);
    const hotkeyaSpy = jasmine.createSpyObj('HotkeysFichierService', ['']);
    const hotkeybSpy = jasmine.createSpyObj('HotkeysSelectionService', ['']);
    const hotkeycSpy = jasmine.createSpyObj('HotkeysTravailService', ['']);
    const toolSpy = jasmine.createSpyObj('ToolsService', ['selectTool']);
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, WelcomeDialogModule, HttpClientModule, MatButtonToggleModule],
      providers: [{ provide: ToggleDrawerService, useValue: toogleSpy },
      { provide: ToolsService, useValue: toolSpy }, { provide: HotkeysOutilService, useValue: hotkeyOutilSpy },
      { provide: HotkeysFichierService, useValue: hotkeyaSpy }, { provide: HotkeysSelectionService, useValue: hotkeybSpy },
      { provide: HotkeysTravailService, useValue: hotkeycSpy }],
    });
    toggleDrawerServiceSpy = TestBed.get(ToggleDrawerService);
    hotkeyOutilServiceSpy = TestBed.get(HotkeysOutilService);
    hotkeyaServiceSpy = TestBed.get(HotkeysFichierService);
    hotkeybServiceSpy = TestBed.get(HotkeysSelectionService);
    hotkeycServiceSpy = TestBed.get(HotkeysTravailService);
    toolServiceSpy = TestBed.get(ToolsService);
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
    toggleDrawerServiceSpy.isOpened = false;
    expect(service.isOpened).toEqual(false);
    toggleDrawerServiceSpy.isOpened = true;
    expect(service.isOpened).toEqual(true);
  });

  it('should get tool list length when selectedParameter is called and isControlMenu is true', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = true;
    toolServiceSpy.tools = new Map([[1, new MockItool()]]);
    expect(service.selectedParameter).toEqual(1);
  });

  it('should get tool list selected tools id when selectedParameter is called and isControlMenu is false', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = false;
    toolServiceSpy.selectedToolId = 4;
    expect(service.selectedParameter).toEqual(4);
  });

  it('should open', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.open();
    expect(toggleDrawerServiceSpy.open).toHaveBeenCalled();
  });

  it('should close', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.close();
    expect(toggleDrawerServiceSpy.close).toHaveBeenCalled();
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

  it('should call eventListenerOnInput and not execute hotkeys if target is not undefined', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    const mouseEvent = new MouseEvent('mousedown');
    service.canClick = true;
    const input = document.createElement('input');
    input.value = '2';
    spyOnProperty(mouseEvent, 'target').and.returnValue(input);
    window.dispatchEvent(mouseEvent);
    expect(hotkeyOutilServiceSpy.canExecute).toEqual(false);
    expect(hotkeyaServiceSpy.canExecute).toEqual(false);
    expect(hotkeybServiceSpy.canExecute).toEqual(false);
    expect(hotkeycServiceSpy.canExecute).toEqual(false);
  });

  it('should get tool list', () => {
    const service: SidenavService = TestBed.get(SidenavService);
    service.isControlMenu = true;

    service.selectionChanged(MatButtonToggleChange.prototype);

    expect(toolServiceSpy.selectTool).toHaveBeenCalled();
  });
});

class MockItool implements ITools {
  readonly id: 5;
  readonly faIcon: IconDefinition;
  readonly toolName: 'brush';
  parameters: FormGroup;
  onPressed(event: MouseEvent) {
    if (event.button === 0) {
      return null;
    }
    return;
  }
  // tslint:disable-next-line: no-empty
  onRelease(event: MouseEvent): void {
  }
  // tslint:disable-next-line: no-empty
  onMove(event: MouseEvent): void {
  }
  // tslint:disable-next-line: no-empty
  onKeyDown(event: KeyboardEvent): void {
  }
  // tslint:disable-next-line: no-empty
  onKeyUp(event: KeyboardEvent): void {
  }
}
