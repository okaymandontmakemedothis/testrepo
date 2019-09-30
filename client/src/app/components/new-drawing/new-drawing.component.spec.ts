import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NewDrawingComponent } from './new-drawing.component';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { DrawingSizeValidatorService } from 'src/app/services/drawing-size-validator/drawing-size-validator.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  const drawingSizeValidatorService: DrawingSizeValidatorService = new DrawingSizeValidatorService();
  const formBuilder: FormBuilder = new FormBuilder();
  const workspaceService: WorkspaceService = new WorkspaceService();
  const newDrawingService: NewDrawingService = new NewDrawingService(drawingSizeValidatorService, formBuilder, workspaceService);
  const drawingService: DrawingService = new DrawingService();
  const colorTransformerService: ColorTransformerService = new ColorTransformerService();
  const colorPickerService: ColorPickerService = new ColorPickerService(colorTransformerService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [NewDrawingComponent],
      providers: [MatDialogRef, MatSnackBar, MatDialog, { provide: NewDrawingService, useValue: newDrawingService},
        { provide: DrawingService, useValue: drawingService }, { provide: ColorPickerService, useValue: colorPickerService }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new drawing component', () => {
    expect(component).toBeTruthy();
  });
});
