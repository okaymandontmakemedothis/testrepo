import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { GridService } from 'src/app/services/tools/grid-tool/grid.service';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  let dialogSpy: jasmine.Spy;

  // let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    open: null,
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    rendererSpy = jasmine.createSpyObj('Renderer2', ['createElement', 'setProperty', 'setAttribute', 'appendChild', 'setStyle', ]);
    let spyDrawingService = jasmine.createSpyObj('DrawingService', ['addObject', 'removeObject', 'newDrawing']);
    spyDrawingService = {
      ...spyDrawingService,
      renderer: rendererSpy,
    };

    TestBed.configureTestingModule({
      imports: [MaterialModules, ReactiveFormsModule, FormsModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NewDrawingComponent],
      providers: [Overlay, MatSnackBar,
        GridService,
        { provide: DrawingService, useValue: spyDrawingService },
        { provide: MatDialogRef, useValue: dialogRefSpyObj }],
    });
    TestBed.compileComponents();

    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    drawingServiceSpy = TestBed.get(DrawingService);
    drawingServiceSpy.drawing = document.createElementNS('svg', 'svg') as SVGElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new drawing component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call dialog.open on the first time onAccept is called', () => {
    component.onAccept();
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it('should call dialog.open and dialog.close on the second time onAccept is called', () => {
    component.onAccept();
    component.onAccept();
    expect(dialogSpy).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  // it('should not call dialog.close on the second time onAccept is called', () => {
  //   // ...
  // });

  it('should call dialogRef.close onCancel', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
