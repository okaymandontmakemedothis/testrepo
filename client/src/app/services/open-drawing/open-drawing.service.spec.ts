import { TestBed } from '@angular/core/testing';

import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';
import { Drawing } from '../../../../../common/communication/drawing';
import { IndexService } from '../index/index.service';
import { OpenDrawingService } from './open-drawing.service';

describe('OpenDrawingService', () => {
  let indexServiceSpy: SpyObj<IndexService>;
  const mockDrawing: Drawing = {

    name: 'mock',
    tags: ['tag1', 'tag2'],
    width: 0,
    height: 0,
    backGroundColor: { rgb: { r: 0, g: 0, b: 0 }, a: 0 },
    drawingObjects: [],
    thumbnail: '<svg></svg>',

};

  beforeEach(() => {
    const indexSpy = jasmine.createSpyObj('IndexService', ['getDrawingPreview']);
    TestBed.configureTestingModule({
      providers: [{provide: IndexService, useValue: indexSpy}],
    });
    indexServiceSpy = TestBed.get(IndexService);
    indexServiceSpy.getDrawingPreview.and.returnValue(of([mockDrawing]));

  });

  it('should be created', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    expect(service).toBeTruthy();
  });
  it('should get drawing previews', () => {
    const service: OpenDrawingService = TestBed.get(OpenDrawingService);
    service.drawingList.subscribe((drawingList) => {
      expect(drawingList).toEqual([mockDrawing]);

    });

  });
});
