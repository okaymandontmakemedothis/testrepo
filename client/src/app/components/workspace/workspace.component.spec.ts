import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from 'src/app/app-material.module';
import { HotkeysFichierService } from 'src/app/services/hotkeys/hotkeys-fichier/hotkeys-fichier.service';
import { HotkeysOutilService } from 'src/app/services/hotkeys/hotkeys-outil/hotkeys-outil.service';
import { HotkeysSelectionService } from 'src/app/services/hotkeys/hotkeys-selection/hotkeys-selection.service';
import { HotkeysTravailService } from 'src/app/services/hotkeys/hotkeys-travail/hotkeys-travail.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { WorkspaceComponent } from './workspace.component';

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;
  let toolServiceSpy: jasmine.SpyObj<ToolsService>;
  let hotkeyFichierServiceSpy: jasmine.SpyObj<HotkeysFichierService>;
  let hotkeySelectionServiceSpy: jasmine.SpyObj<HotkeysSelectionService>;
  let hotkeyOutilServiceSpy: jasmine.SpyObj<HotkeysOutilService>;
  let hotkeyTravailServiceSpy: jasmine.SpyObj<HotkeysTravailService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceComponent],
      imports: [MaterialModules, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const spyTool = jasmine.createSpyObj('ToolsService', ['onPressed', 'onRelease', 'onMove']);
    const spyHotFichier = jasmine.createSpyObj('HotkeysFichierService', ['hotkeysFichier']);
    const spyHotSelec = jasmine.createSpyObj('HotkeysSelectionService', ['hotkeysSelection']);
    const spyHotOutil = jasmine.createSpyObj('HotkeysOutilService', ['hotkeysOutil']);
    const spyHotTravail = jasmine.createSpyObj('HotkeysTravailService', ['hotkeysTravail']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ToolsService, useValue: spyTool },
        { provide: HotkeysFichierService, useValue: spyHotFichier },
        { provide: HotkeysSelectionService, useValue: spyHotSelec },
        { provide: HotkeysOutilService, useValue: spyHotOutil },
        { provide: HotkeysTravailService, useValue: spyHotTravail },
      ],
    });

    toolServiceSpy = TestBed.get(ToolsService);
    hotkeyFichierServiceSpy = TestBed.get(HotkeysFichierService);
    hotkeySelectionServiceSpy = TestBed.get(HotkeysSelectionService);
    hotkeyOutilServiceSpy = TestBed.get(HotkeysOutilService);
    hotkeyTravailServiceSpy = TestBed.get(HotkeysTravailService);

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call press on mouse button press', () => {
    const spy = spyOn(toolServiceSpy, 'onPressed');
    component.onMouseDown(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call move on mouse move', () => {
    const spy = spyOn(toolServiceSpy, 'onMove');
    component.onMouseMove(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call release on mouse button unpress', () => {
    const spy = spyOn(toolServiceSpy, 'onRelease');
    component.onMouseUp(new MouseEvent('mousedown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call press on mouse button right press', () => {
    expect(component.onRightClick(new MouseEvent('mousedown'))).not.toBeTruthy();
  });

  it('should call hotkey on key down', () => {
    const spyFichier = spyOn(hotkeyFichierServiceSpy, 'hotkeysFichier');
    const spyOutil = spyOn(hotkeyOutilServiceSpy, 'hotkeysOutil');
    const spySelect = spyOn(hotkeySelectionServiceSpy, 'hotkeysSelection');
    const spyTravail = spyOn(hotkeyTravailServiceSpy, 'hotkeysTravail');

    component.listenHotkey(new KeyboardEvent('keydown'));

    expect(spyFichier).toHaveBeenCalled();
    expect(spyOutil).toHaveBeenCalled();
    expect(spySelect).toHaveBeenCalled();
    expect(spyTravail).toHaveBeenCalled();
  });
});
