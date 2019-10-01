import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef, MatSnackBar, MatDialogModule } from '@angular/material';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { NewDrawingService } from 'src/app/services/new-drawing/new-drawing.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { NewDrawingComponent } from './new-drawing.component';
import { of } from 'rxjs';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const workspaceService: WorkspaceService = new WorkspaceService();
  const newDrawingService: NewDrawingService = new NewDrawingService(formBuilder, workspaceService);
  const drawingService: DrawingService = new DrawingService();
  const colorTransformerService: ColorTransformerService = new ColorTransformerService();
  const colorPickerService: ColorPickerService = new ColorPickerService(colorTransformerService);
  // let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: "" };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NewDrawingComponent],
      providers: [Overlay, MatSnackBar,
        { provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: [] },
        { provide: MatDialogRef, useValue: ['afterOpened'] },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: NewDrawingService, useValue: newDrawingService },
        { provide: DrawingService, useValue: drawingService },
        { provide: ColorPickerService, useValue: colorPickerService }],
    });
    TestBed.compileComponents();
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
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
