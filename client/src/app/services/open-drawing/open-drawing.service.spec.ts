import { TestBed, async } from '@angular/core/testing';

import { OpenDrawingService } from './open-drawing.service';
import { IndexService } from '../index/index.service';
import SpyObj = jasmine.SpyObj;
import { of, BehaviorSubject } from 'rxjs';
import { Drawing } from '../../../../../common/communication/drawing';

describe('OpenDrawingService', () => {
  let indexServiceSpy: SpyObj<IndexService>;
  const mockDrawing:Drawing = {
      
    name: "mock",
    tags: ["tag1","tag2"],
    width: 0,
    height: 0,
    backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 0 },
    drawingObjects: [],
    thumbnail: "<svg></svg>",

}
  beforeEach(() => {
    indexServiceSpy = jasmine.createSpyObj('IndexService', ['getDrawingPreview']);

    indexServiceSpy.getDrawingPreview.and.returnValue(of([mockDrawing]));
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:[OpenDrawingService],
      providers:[
        OpenDrawingService,{provide: IndexService, indexServiceSpy}
      ]
    })
    TestBed.compileComponents();

  }));

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
  it('should get drawing previews', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    const result :BehaviorSubject<Drawing[]> = service.drawingList
    expect(result).toEqual(new BehaviorSubject<Drawing[]>([mockDrawing]))

  });
});
