import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModules } from 'src/app/app-material.module';
import { Drawing } from '../../../../../common/communication/drawing';
import { DrawingService } from '../drawing/drawing.service';
import { GetDrawingRequestService } from '../get-drawing-request/get-drawing-request.service';
import { TagService } from '../tag/tag.service';
import { OpenDrawingService } from './open-drawing.service';

describe('OpenDrawingService', () => {
  let service: OpenDrawingService;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  // let tagServiceSpy: jasmine.SpyObj<TagService>;
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
    const spyDrawingService = jasmine.createSpyObj('DrawingService', ['newDrawing', 'addDrawingObjectList', 'openDrawing',]);
    const spyTagService = jasmine.createSpyObj('TagService', ['containsTag', 'retrieveTags']);
    // const tagControl: FormControl = new FormControl('Test');

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
    // tagServiceSpy = TestBed.get(TagService);
    getDrawingRequestServiceSpy = TestBed.get(GetDrawingRequestService);

    TestBed.compileComponents();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get drawing previews', () => {
    getDrawingRequestServiceSpy.getDrawings.and.returnValue(of([mockDrawing]));

    service.getDrawings().subscribe((drawingList: Drawing[]) => {
      expect(getDrawingRequestServiceSpy.getDrawings).toHaveBeenCalled();
      expect(drawingList).toEqual([mockDrawing]);
    });
  });
  it('should getBackground from drawing', () => {

    const result = service.getBackground(mockDrawing);
    expect(result).toEqual(`rgba(0,0,0,0)`);

  });
  it('should return grey background color for selected', () => {
    service.selectedDrawing = mockDrawing;
    const result = service.getBackgroundSelected(mockDrawing);
    expect(result).toEqual('grey');

  });
  it('should return white background color for not selected', () => {
    service.selectedDrawing = null;

    const result = service.getBackgroundSelected(mockDrawing);
    expect(result).toEqual(`white`);

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

  it('#openDrawing should not call openDrawing on drawing service if no selected drawing', () => {
    const dialogRef = TestBed.get(MatDialogRef);

    service.openDrawing(dialogRef);
    expect(drawingServiceSpy.openDrawing).not.toHaveBeenCalled();
  });

  it('#remove should remove the tag if it exist', () => {
    service.selectedTags = ['tag1', 'tag2'];
    service.remove('tag2');
    expect(service.selectedTags).toEqual(['tag1']);
  });

  it('#remove should not remove the tag if it doesnt exist', () => {
    service.selectedTags = ['tag1', 'tag2'];
    service.remove('tag3');
    expect(service.selectedTags).toEqual(['tag1', 'tag2']);
  });

});
