import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from 'src/app/app-material.module';
import { GridService } from 'src/app/services/tools/grid-tool/grid.sevice';
import { GridParameterComponent } from './grid-parameter.component';

describe('GridParameterComponent', () => {
  let component: GridParameterComponent;
  let fixture: ComponentFixture<GridParameterComponent>;
  let gridService: GridService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridParameterComponent],
      imports: [ReactiveFormsModule,
        MatButtonToggleModule, BrowserAnimationsModule, MaterialModules],
    })
      .compileComponents();
    gridService = TestBed.get(GridService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the tool name', () => {
    expect(component.toolName).toEqual(gridService.toolName);
  });

  it('should return the cellSize value', () => {
    const form = gridService.parameters.get('sizeCell') as FormControl;
    form.patchValue(6);
    expect(component.cellSizeValue).toEqual(6);
  });

  it('should return the cellSize value', () => {
    const form = gridService.parameters.get('transparence') as FormControl;
    form.patchValue(0.5);
    expect(component.transparenceValue).toEqual(0.5);
  });

  it('should patch color value in form', () => {
    component.form = new FormGroup({ color: new FormControl('') });
    const spy = spyOn(component.form, 'patchValue');
    const spyFunction = spyOn(gridService, 'changeColor');
    component.currentColor = 0;
    component.changeColor(1);
    expect(spy).toHaveBeenCalled();
    expect(spyFunction).toHaveBeenCalled();
  });

  it('should call grid service function change opacity on enter', () => {
    const spy = spyOn(gridService, 'changeOpacity');
    const event = new KeyboardEvent('keypress', {
      key: 'Enter',
    });
    component.changeOpacityKey(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should not call grid service function change opacity if keyboard key is not enter', () => {
    const spy = spyOn(gridService, 'changeOpacity');
    const event = new KeyboardEvent('keypress', {
      key: 'Shift',
    });
    component.changeOpacityKey(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call grid service function change grid size on enter', () => {
    const spy = spyOn(gridService, 'changeGridSize');
    const event = new KeyboardEvent('keypress', {
      key: 'Enter',
    });
    component.changeGridSizeKey(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should not call grid service function change grid size if keyboard key is not enter', () => {
    const spy = spyOn(gridService, 'changeGridSize');
    const event = new KeyboardEvent('keypress', {
      key: 'Shift',
    });
    component.changeGridSizeKey(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call grid service function change grid size on lost focus', () => {
    const spy = spyOn(gridService, 'changeGridSize');
    component.changeGridSizeOnLostFocus();
    expect(spy).toHaveBeenCalled();
  });

  it('should call grid service function change opacity on lost focus', () => {
    const spy = spyOn(gridService, 'changeOpacity');
    component.changeOpacityOnLostFocus();
    expect(spy).toHaveBeenCalled();
  });

  it('should call grid service function show grid id activegrille is true', () => {
    gridService.activerGrille.setValue(true);
    const spy = spyOn(gridService, 'showGrid');
    component.onSelection();

    expect(spy).toHaveBeenCalled();
  });

  it('should call grid service function hide grid id activegrille is false', () => {
    gridService.activerGrille.setValue(false);
    const spy = spyOn(gridService, 'hideGrid');
    component.onSelection();

    expect(spy).toHaveBeenCalled();
  });
});
