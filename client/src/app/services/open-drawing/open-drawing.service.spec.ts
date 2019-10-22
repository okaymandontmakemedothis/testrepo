import { ComponentFixture, TestBed } from '@angular/core/testing';

// import SpyObj = jasmine.SpyObj;
// import { of } from 'rxjs';
// import { Drawing } from '../../../../../common/communication/drawing';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { OpenDrawingComponent } from 'src/app/components/open-drawing/open-drawing.component';
import { Drawing } from '../../../../../common/communication/drawing';
import { DrawingService } from '../drawing/drawing.service';
import { GetDrawingRequestService } from '../get-drawing-request/get-drawing-request.service';
import { IndexService } from '../index/index.service';
import { TagService } from '../tag/tag.service';
import { OpenDrawingService } from './open-drawing.service';

describe('OpenDrawingService', () => {
  let service: OpenDrawingService;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let tagServiceSpy: jasmine.SpyObj<TagService>;
  let getDrawingRequestServiceSpy: jasmine.SpyObj<GetDrawingRequestService>;

  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    afterOpened: of({}),
    close: null,
  });
  const mockDrawing: Drawing = {
    id: '2',
    name: 'mock',
    tags: ['tag1', 'tag2'],
    width: 0,
    height: 0,
    backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 0 },
    svg: 'example',
  };
  beforeEach(() => {
    const spyDrawingService = jasmine.createSpyObj('DrawingService', ['newDrawing', 'addDrawingObjectList', 'openDrawing', ]);
    const spyTagService = jasmine.createSpyObj('TagService', ['containsTag', 'retrieveTags']);
    const tagControl: FormControl = new FormControl('Test');

    const spyGetDrawingRequest = jasmine.createSpyObj('GetDrawingRequestService', ['getDrawings']);

    spyTagService.retrieveTags.and.returnValue(of(['tag1', 'tag2']));
    TestBed.configureTestingModule(
      {
        imports: [MaterialModules, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],

      providers: [{ provide: DrawingService, useValue: spyDrawingService }, { provide: TagService, useValue: spyTagService },
        { provide: GetDrawingRequestService, useValue: spyGetDrawingRequest }, { provide: MatDialogRef, useValue: dialogRefSpyObj }],
    });
    service = TestBed.get(OpenDrawingService);
    drawingServiceSpy = TestBed.get(DrawingService);
    tagServiceSpy = TestBed.get(TagService);
    getDrawingRequestServiceSpy = TestBed.get(GetDrawingRequestService);

    console.log('LOG Kevin');
    TestBed.compileComponents();

  });

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
  it('should get drawing previews',  ()  => {
    getDrawingRequestServiceSpy.getDrawings.and.returnValue(of([mockDrawing]));

    service.getDrawings().subscribe((drawingList: Drawing[]) => {
      expect(getDrawingRequestServiceSpy.getDrawings).toHaveBeenCalled();
      expect(drawingList).toEqual([mockDrawing]);
    });

  });
  it('#reset should reset the values for the save drawing service', () => {
    service.reset();
    expect(service.tagCtrl.untouched).toBeTruthy();
    expect(service.selectedTags.length).toEqual(0);
  });

  it('#add should add a tag in the list of selected tags', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.value = 'VALUE';
    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, true);
    expect(service.tagCtrl.value).toBeNull();
    expect(service.selectedTags.includes(value.trim())).toBeTruthy();
    expect(input.value).toEqual('');
  });
  it('#add should not a tag if already present', () => {
    service.selectedTags = ['test'];

    const intialLength: number = service.selectedTags.length;

    const input: HTMLInputElement = document.createElement('input');
    input.value = 'VALUE';
    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, true);
    expect(service.selectedTags.length).toEqual(intialLength);

  });
  it('#filter should return the tags filtered to match string', () => {
    expect(service.filter('Tag1')).toEqual(['tag1']);
  });
  it('should change the filtered tags', () => {
    service.filteredTags.subscribe((value) => {
      expect(value).toBeTruthy();
    });
    service.tagCtrl.patchValue('tag1');
  });
  it('#selected should push the tag value', () => {
    service.selectTag('Tag8');
    expect(service.selectedTags.includes('Tag8')).toBeTruthy();
    expect(service.tagCtrl.value).toBeNull();
  });
  it('#accept should not open drawing if no drawing selected', () => {
    service.selectedDrawing = null;
    const dialogRef = TestBed.get(MatDialogRef);
    expect(service.accept(dialogRef)).not.toBeDefined();
  });

  it('#openDrawing should  call openDrawing on drawing service', () => {
    const dialogRef = TestBed.get(MatDialogRef);
    service.selectedDrawing = mockDrawing;

    service.openDrawing(dialogRef);
    expect(drawingServiceSpy.openDrawing).toHaveBeenCalled();
  });
});
