import { TestBed, ComponentFixture } from '@angular/core/testing';

// import SpyObj = jasmine.SpyObj;
// import { of } from 'rxjs';
// import { Drawing } from '../../../../../common/communication/drawing';
import { IndexService } from '../index/index.service';
import { OpenDrawingService } from './open-drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { DrawingService } from '../drawing/drawing.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TagService } from '../tag/tag.service';
import { of } from 'rxjs';

describe('OpenDrawingService', () => {
  let service: OpenDrawingService;
  let fixture: ComponentFixture<OpenDrawingService>; 
   let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
   let tagServiceSpy: jasmine.SpyObj<TagService>;

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
    const spyTagService = jasmine.createSpyObj('TagService', ['containsTag','retrieveTags']);
    const tagControl: FormControl = new FormControl('Test');


    const indexSpy = jasmine.createSpyObj('IndexService', ['getDrawingPreview']);

    spyTagService.retrieveTags.and.returnValue(of(['tag1', 'tag2']))
    TestBed.configureTestingModule(
      {
        imports: [MaterialModules, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],

      providers: [{ provide: DrawingService, useValue: spyDrawingService },{ provide: TagService, useValue: spyTagService }],
    });
    service = TestBed.get(OpenDrawingService);
    drawingServiceSpy = TestBed.get(DrawingService);
    tagServiceSpy = TestBed.get(TagService);

    console.log('LOG Kevin');
    TestBed.compileComponents();


  });

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
  it('should get drawing previews', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);

    service.getDrawings().subscribe((drawingList:Drawing[]) => {
      console.log(drawingList)
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
    service.selectedTags=['test']

    const intialLength: number = service.selectedTags.length;

    const input: HTMLInputElement = document.createElement('input');
    input.value = 'VALUE';
    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, true);
    expect(service.selectedTags.length).toEqual(intialLength);

  });
});
