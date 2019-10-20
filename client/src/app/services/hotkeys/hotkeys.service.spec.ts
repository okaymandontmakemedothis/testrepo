import { TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
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
    let hotkeyFichierSpy = jasmine.createSpyObj('HotkeysFichierService', ['hotkeysFichier']);
    let hotkeyOutilSpy = jasmine.createSpyObj('HotkeysOutilService', ['hotkeysOutil']);
    let hotkeySelectSpy = jasmine.createSpyObj('HotkeysSelectionService', ['hotkeysSelection']);
    let hotkeyTravailSpy = jasmine.createSpyObj('HotkeysTravailService', ['hotkeysTravail']);

    hotkeyFichierSpy = {
      hotkeysFichierEmitter: of({}),
      hotkeysFichier: () => { return; },
    };
    hotkeyOutilSpy = {
      hotkeysOutilEmitter: of({}),
      hotkeysOutil: () => { return; },
    };
    hotkeySelectSpy = {
      hotkeysSelectionEmitter: of({}),
      hotkeysSelection: () => { return; },
    };
    hotkeyTravailSpy = {
      hotkeysTravailEmitter: of({}),
      hotkeysTravail: () => { return; },
    };

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

    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(() => { return; });
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

  /*it('should suscribe to hotkeys', () => {
    const service: HotkeysService = TestBed.get(HotkeysService);

    const spy = spyOn(service, 'disableHotkeys');

    //hotkeyFichierServiceSpy.hotkeysFichierEmitter;

    expect(spy).toHaveBeenCalled();
  });*/
});
