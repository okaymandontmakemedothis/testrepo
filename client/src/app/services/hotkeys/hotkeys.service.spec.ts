import { TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { HotkeysFichierService } from './hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from './hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from './hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from './hotkeys-travail/hotkeys-travail.service';
import { HotkeysService } from './hotkeys.service';

describe('HotkeysService', () => {
  let hotkeyFichierServiceSpy: jasmine.SpyObj<HotkeysFichierService>;
  let hotkeyOutilServiceSpy: jasmine.SpyObj<HotkeysOutilService>;
  let hotkeySelectServiceSpy: jasmine.SpyObj<HotkeysSelectionService>;
  let hotkeyTravailServiceSpy: jasmine.SpyObj<HotkeysTravailService>;

  beforeEach(() => {
    const hotkeyFichierSpy = jasmine.createSpyObj('HotkeysFichierService', ['hotkeysFichier']);
    const hotkeyOutilSpy = jasmine.createSpyObj('HotkeysOutilService', ['hotkeysOutil']);
    const hotkeySelectSpy = jasmine.createSpyObj('HotkeysSelectionService', ['hotkeysSelection']);
    const hotkeyTravailSpy = jasmine.createSpyObj('HotkeysTravailService', ['hotkeysTravail']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: HotkeysFichierService, useValue: hotkeyFichierSpy },
        { provide: HotkeysOutilService, useValue: hotkeyOutilSpy },
        { provide: HotkeysSelectionService, useValue: hotkeySelectSpy },
        { provide: HotkeysTravailService, useValue: hotkeyTravailSpy }],
    });

    hotkeyFichierServiceSpy = TestBed.get(HotkeysFichierService);
    hotkeyOutilServiceSpy = TestBed.get(HotkeysOutilService);
    hotkeySelectServiceSpy = TestBed.get(HotkeysSelectionService);
    hotkeyTravailServiceSpy = TestBed.get(HotkeysTravailService);
  });

  it('should be created', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    expect(service).toBeTruthy();
  });

  it('should disable hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

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

  it('should enable hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    service.disableHotkeys();

    expect(hotkeyFichierServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeyOutilServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeySelectServiceSpy.canExecute).not.toBeTruthy();
    expect(hotkeyTravailServiceSpy.canExecute).not.toBeTruthy();

    service.enableHotkeys();

    expect(hotkeyFichierServiceSpy.canExecute).toBeTruthy();
    expect(hotkeyOutilServiceSpy.canExecute).toBeTruthy();
    expect(hotkeySelectServiceSpy.canExecute).toBeTruthy();
    expect(hotkeyTravailServiceSpy.canExecute).toBeTruthy();
  });

  it('should listen to hotkeys', () => {
    TestBed.get(HotkeysService);

    window.dispatchEvent(new KeyboardEvent('keydown'));

    expect(hotkeyFichierServiceSpy.hotkeysFichier).toHaveBeenCalled();
    expect(hotkeyOutilServiceSpy.hotkeysOutil).toHaveBeenCalled();
    expect(hotkeySelectServiceSpy.hotkeysSelection).toHaveBeenCalled();
    expect(hotkeyTravailServiceSpy.hotkeysTravail).toHaveBeenCalled();
  });

  it('should suscribe to hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);
    expect(service).toBeTruthy();
  });
});
