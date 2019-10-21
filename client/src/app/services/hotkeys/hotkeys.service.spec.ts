import { TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToolsService } from '../tools/tools.service';
import { HotkeysFichierService } from './hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from './hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from './hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from './hotkeys-travail/hotkeys-travail.service';
import { HotkeysService } from './hotkeys.service';
import { EmitReturn } from './hotkeys-constants';
import { EventEmitter } from '@angular/core';
import { GridService } from '../tools/grid-tool/grid.service';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';

describe('HotkeysService', () => {
  let hotkeyFichierServiceSpy: jasmine.SpyObj<HotkeysFichierService>;
  let hotkeyOutilServiceSpy: jasmine.SpyObj<HotkeysOutilService>;
  let hotkeySelectServiceSpy: jasmine.SpyObj<HotkeysSelectionService>;
  let hotkeyTravailServiceSpy: jasmine.SpyObj<HotkeysTravailService>;

  let toolsServiceSpy: jasmine.SpyObj<ToolsService>;
  let gridServiceSpy: jasmine.SpyObj<GridService>;

  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    open: null,
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    let hotkeyFichierSpy = jasmine.createSpyObj('HotkeysFichierService', ['hotkeysFichier']);
    let hotkeyOutilSpy = jasmine.createSpyObj('HotkeysOutilService', ['hotkeysOutil']);
    let hotkeySelectSpy = jasmine.createSpyObj('HotkeysSelectionService', ['hotkeysSelection']);
    let hotkeyTravailSpy = jasmine.createSpyObj('HotkeysTravailService', ['hotkeysTravail']);
    const toolsSpy = jasmine.createSpyObj('ToolsService', ['selectTool']);
    const gridSpy = jasmine.createSpyObj('GridService', ['showGrid', 'hideGrid', 'changeGridSize']);

    hotkeyFichierSpy = {
      hotkeysFichierEmitter: new EventEmitter(),
      hotkeysFichier: () => { return; },
    };
    hotkeyOutilSpy = {
      hotkeysOutilEmitter: new EventEmitter(),
      hotkeysOutil: () => { return; },
    };
    hotkeySelectSpy = {
      hotkeysSelectionEmitter: new EventEmitter(),
      hotkeysSelection: () => { return; },
    };
    hotkeyTravailSpy = {
      hotkeysTravailEmitter: new EventEmitter(),
      hotkeysTravail: () => { return; },
    };

    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: HotkeysFichierService, useValue: hotkeyFichierSpy },
        { provide: HotkeysOutilService, useValue: hotkeyOutilSpy },
        { provide: HotkeysSelectionService, useValue: hotkeySelectSpy },
        { provide: HotkeysTravailService, useValue: hotkeyTravailSpy },
        { provide: ToolsService, useValue: toolsSpy },
        { provide: GridService, useValue: gridSpy },
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
      ],
    });

    hotkeyFichierServiceSpy = TestBed.get(HotkeysFichierService);
    hotkeyOutilServiceSpy = TestBed.get(HotkeysOutilService);
    hotkeySelectServiceSpy = TestBed.get(HotkeysSelectionService);
    hotkeyTravailServiceSpy = TestBed.get(HotkeysTravailService);
    toolsServiceSpy = TestBed.get(ToolsService);
    gridServiceSpy = TestBed.get(GridService);

    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should be created', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    expect(service).toBeTruthy();
  });

  it('should enable and then disable hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    service.enableHotkeys();

    expect(hotkeyFichierServiceSpy.canExecute).toBeTruthy();
    expect(hotkeyOutilServiceSpy.canExecute).toBeTruthy();
    expect(hotkeySelectServiceSpy.canExecute).toBeTruthy();
    expect(hotkeyTravailServiceSpy.canExecute).toBeTruthy();

    service.disableHotkeys();

    expect(hotkeyFichierServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeyOutilServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeySelectServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeyTravailServiceSpy.canExecute).not.toBeTruthy();
  });

  it('should listen to hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    spyOn(hotkeyFichierServiceSpy, 'hotkeysFichier');
    spyOn(hotkeyOutilServiceSpy, 'hotkeysOutil');
    spyOn(hotkeySelectServiceSpy, 'hotkeysSelection');
    spyOn(hotkeyTravailServiceSpy, 'hotkeysTravail');

    service.hotkeysListener();
    window.dispatchEvent(new KeyboardEvent('keydown'));

    expect(hotkeyFichierServiceSpy.hotkeysFichier).toHaveBeenCalled();
    expect(hotkeyOutilServiceSpy.hotkeysOutil).toHaveBeenCalled();
    expect(hotkeySelectServiceSpy.hotkeysSelection).toHaveBeenCalled();
    expect(hotkeyTravailServiceSpy.hotkeysTravail).toHaveBeenCalled();
  });

  it('should disable hotkeys if a click is made in an input box', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    service.enableHotkeys();

    const spy = spyOn(service, 'disableHotkeys');

    const mouseEvent = new MouseEvent('mousedown');
    const htmlInput = document.createElement('input') as HTMLInputElement;
    htmlInput.value = '1';
    spyOnProperty(mouseEvent, 'target').and.returnValue(htmlInput);
    window.dispatchEvent(mouseEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should enable hotkeys if a click is made out of an input box and onClick is true', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    service.disableHotkeys();

    const spy = spyOn(service, 'enableHotkeys');

    const mouseEvent = new MouseEvent('mousedown');
    service.canClick = true;

    window.dispatchEvent(mouseEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should not enable hotkeys if a click is made out of an input box and onClick is false', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    service.disableHotkeys();

    const spy = spyOn(service, 'enableHotkeys');

    const mouseEvent = new MouseEvent('mousedown');

    service.canClick = false;

    window.dispatchEvent(mouseEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should select a tool on emit of hotkeyToolService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();

    hotkeyOutilServiceSpy.hotkeysOutilEmitter.emit(EmitReturn.PENCIL);

    expect(toolsServiceSpy.selectTool).toHaveBeenCalled();
  });

  it('should not select a tool on emit of hotkeyToolService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();

    hotkeyOutilServiceSpy.hotkeysOutilEmitter.emit('a');

    expect(toolsServiceSpy.selectTool).not.toHaveBeenCalled();
  });

  it('should affect grid on emit of hotkeysTravailService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();
    gridServiceSpy.sizeCell = new FormControl();
    gridServiceSpy.sizeCell.setValue(1);

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit(EmitReturn.ENABLE_GRID);
    expect(gridServiceSpy.showGrid).toHaveBeenCalled();

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit(EmitReturn.DISABLE_GRID);
    expect(gridServiceSpy.hideGrid).toHaveBeenCalled();

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit(EmitReturn.ADD5_GRID);
    expect(gridServiceSpy.changeGridSize).toHaveBeenCalled();

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit(EmitReturn.SUB5_GRID);
    expect(gridServiceSpy.changeGridSize).toHaveBeenCalled();
  });

  it('should not affect grid on emit of hotkeysTravailService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit('a');
    expect(gridServiceSpy.showGrid).not.toHaveBeenCalled();
    expect(gridServiceSpy.hideGrid).not.toHaveBeenCalled();
    expect(gridServiceSpy.changeGridSize).not.toHaveBeenCalled();
  });

  it('should open a dialog on emit of hotkeyFichierService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();

    hotkeyFichierServiceSpy.hotkeysFichierEmitter.emit(EmitReturn.NEW_DRAWING);

    hotkeyFichierServiceSpy.hotkeysFichierEmitter.emit(EmitReturn.SAVE_DRAWING);

    hotkeyFichierServiceSpy.hotkeysFichierEmitter.emit(EmitReturn.OPEN_DRAWING);

    expect(dialogSpy).toHaveBeenCalledTimes(3);

  });

  it('should not open a dialog on emit of hotkeyFichierService', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    service.hotkeysListener();

    hotkeyTravailServiceSpy.hotkeysTravailEmitter.emit('a');
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it('should disable hotkey on dialog open', () => {
  });

  it('should disable hotkey after all dialog close', () => {
  });
});
