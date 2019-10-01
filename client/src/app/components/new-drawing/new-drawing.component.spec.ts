import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const workspaceService: WorkspaceService = new WorkspaceService();
  const newDrawingService: NewDrawingService = new NewDrawingService(formBuilder, workspaceService);
  const drawingService: DrawingService = new DrawingService();
  const colorTransformerService: ColorTransformerService = new ColorTransformerService();
  const colorPickerService: ColorPickerService = new ColorPickerService(colorTransformerService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [NewDrawingComponent],
      providers: [MatDialogRef, MatSnackBar, MatDialog, { provide: NewDrawingService, useValue: newDrawingService },
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
