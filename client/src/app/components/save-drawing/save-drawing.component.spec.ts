import { Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { SaveDrawingService } from 'src/app/services/save-drawing/save-drawing.service';
import { SaveDrawingComponent } from './save-drawing.component';
import { HttpClientModule } from '@angular/common/http';

describe('SaveDrawingComponent', () => {
  let component: SaveDrawingComponent;
  let fixture: ComponentFixture<SaveDrawingComponent>;

  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };
  const tagControl: FormControl = new FormControl('Test');
  let saveDrawingServiceSpy = jasmine.createSpyObj('SaveDrawingService', ['add', 'remove', 'open', 'selected', 'save']);
  saveDrawingServiceSpy = {
    ...saveDrawingServiceSpy,
    nameCtrl: new FormControl('Name'),
    tags: [],
    tagCtrl: tagControl,
    filteredTags: of(['test']),
    saveEnabled: true,
  };
  let drawingServiceSpy = jasmine.createSpyObj('DrawingService', ['drawString']);
  drawingServiceSpy = {
    ...drawingServiceSpy,
    width: 300,
    height: 300,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveDrawingComponent],
      imports: [MaterialModules, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,HttpClientModule],
      providers: [Renderer2,
        { provide: SaveDrawingService, useValue: saveDrawingServiceSpy },
        { provide: DrawingService, useValue: drawingServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpyObj }],
    });
    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
