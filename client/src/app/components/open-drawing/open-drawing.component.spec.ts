import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { OpenDrawingComponent } from './open-drawing.component';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { HttpClientModule } from '@angular/common/http';

describe('OpenDrawingComponent', () => {
  let component: OpenDrawingComponent;
  let fixture: ComponentFixture<OpenDrawingComponent>;
  // let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', ['']);
    TestBed.configureTestingModule({
      declarations: [OpenDrawingComponent],
      imports: [MaterialModules, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpyObj },{ provide: DrawingService, useValue: spyDrawing }],
    });

    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDrawingComponent);
    // drawingServiceSpy = TestBed.get(DrawingService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
