import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { OpenDrawingComponent } from './open-drawing.component';

describe('OpenDrawingComponent', () => {
  let component: OpenDrawingComponent;
  let fixture: ComponentFixture<OpenDrawingComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let openDrawingService: jasmine.SpyObj<OpenDrawingService>;
  const mockDrawing: Drawing = {
    id: '2',
    name: 'mock',
    tags: ['tag1', 'tag2'],
    width: 0,
    height: 0,
    backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 0 },
    svg: 'example',
  };

  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    const spyDrawingService = jasmine.createSpyObj('DrawingService', ['newDrawing', 'addDrawingObjectList', 'openDrawing']);

    let spyOpenDrawingService = jasmine.createSpyObj('OpenDrawingService', ['getDrawings', 'selectDrawing', 'getBackgroundSelected',
      'getBackground', 'reset', 'add', 'remove', 'selectTag', 'accept', 'openDrawing']);

    const spyTagService = jasmine.createSpyObj('TagService', ['containsTag']);
    const tagControl: FormControl = new FormControl('Test');

    spyOpenDrawingService.getDrawings.and.returnValue(of(new Array(mockDrawing)));
    spyOpenDrawingService = {
      ...spyOpenDrawingService,
      tagCtrl: tagControl,
      filteredTags: of(['test']),
      tags: [],
      allTags: [],
    };
    TestBed.configureTestingModule({
      declarations: [OpenDrawingComponent],
      imports: [MaterialModules, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpyObj }, { provide: DrawingService, useValue: spyDrawingService }
        , { provide: TagService, useValue: spyTagService }, { provide: OpenDrawingService, useValue: spyOpenDrawingService },
      ],
    });

    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    // spyOn(TestBed.get(OpenDrawingService), 'getDrawings').and.returnValue({
    //   subscribe: (): Observable<Drawing[]> => {
    //     return of(new Array(mockDrawing));
    //   },
    // });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDrawingComponent);
    drawingServiceSpy = TestBed.get(DrawingService);
    openDrawingService = TestBed.get(OpenDrawingService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should create new drawing with drawing service', () => {
  //   // fixture = TestBed.createComponent(OpenDrawingComponent);
  //   // component = fixture.componentInstance;

  //   // component.openDrawing(mockDrawing);
  //   // expect(drawingServiceSpy.addDrawingObjectList).toHaveBeenCalled();
  //   expect(true).toEqual(true);

  // });
  // it('should getBackground from drawing', () => {
  //     const result = component.getBackground(mockDrawing);
  //     expect(result).toEqual(`rgba(0,0,0,0)`);

  // });
  // // it('should getThumbnail',()=>{
  // //   fixture.detectChanges();

  // //   component.getThumbnail(mockDrawing)
  // //   const el = component.co.
  // //   expect(el.innerHtml).toEqual(mockDrawing.svg)
  // // })
  // it('should selectDrawing', () => {
  //   component.selectDrawing(mockDrawing);
  //   expect(component.selectedDrawing).toEqual(mockDrawing);
  // });
  // it('should openDrawing', () => {
  //   component.selectDrawing(mockDrawing);
  //   component.openDrawing();
  //   expect(drawingServiceSpy.openDrawing).toHaveBeenCalled();
  // });
  // it('should add tag ', () => {

  //   const inputEventSpy: jasmine.SpyObj<MatChipInputEvent> = jasmine.createSpyObj('MatChipInputEvent', ['inputElement', 'value']);
  //   inputEventSpy.value = 'mockTag';
  //   component.add(inputEventSpy);
  //   expect(component.selectedTags).toContain('mockTag');
  //   expect(component.selectedDrawing).toBe(null);

  // });
  // it('should remove tag', () => {
  //   const inputEventSpy: jasmine.SpyObj<MatChipInputEvent> = jasmine.createSpyObj('MatChipInputEvent', ['inputElement', 'value']);
  //   inputEventSpy.value = 'mockTag';
  //   component.add(inputEventSpy);
  //   component.remove('mockTag');
  //   expect(component.selectedTags).not.toContain('mockTag');
  //   expect(component.selectedDrawing).toBe(null);
  // });

});
