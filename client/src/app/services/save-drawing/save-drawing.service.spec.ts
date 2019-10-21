import { getTestBed, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { RGB } from 'src/app/model/rgb.model';
import { DrawingService } from '../drawing/drawing.service';
import { ErrorMessageService } from '../error-message/error-message.service';
import { SaveRequestService } from '../save-request/save-request.service';
import { TagService } from '../tag/tag.service';
import { GridService } from '../tools/grid-tool/grid.service';
import { SaveDrawingService } from './save-drawing.service';

describe('SaveDrawingService', () => {
  let injector: TestBed;
  let service: SaveDrawingService;
  let drawingServiceMock: { id: string, width: number, height: number, color: RGB, alpha: number, drawing: SVGElement, saved: boolean }
  let errorMessageSpy: jasmine.SpyObj<ErrorMessageService>;
  let gridServiceSpy: jasmine.SpyObj<GridService>;
  let saveRequestSpy: jasmine.SpyObj<SaveRequestService>;

  beforeEach(() => {
    const spyErrorMessage = jasmine.createSpyObj('ErrorMessage', ['showError']);
    let spyGridService = jasmine.createSpyObj('GridService', ['showGrid', 'hideGrid']);
    const spySaveRequestService: jasmine.Spy = jasmine.createSpyObj('SaveRequestService', ['addDrawing']);
    const svgEl: SVGElement = document.createElementNS('svg', 'svg') as SVGElement;
    drawingServiceMock = {
      id: 'id',
      width: 100,
      height: 100,
      color: { r: 10, g: 100, b: 150 },
      alpha: 0.75,
      drawing: svgEl,
      saved: false,
    };

    spyGridService = {
      ...
      spyGridService,
      activerGrille: new FormControl(false),
    };
    TestBed.configureTestingModule({
      providers: [SaveDrawingService,
        { provide: SaveRequestService, useValue: spySaveRequestService },
        { provide: DrawingService, useValue: drawingServiceMock },
        { provide: ErrorMessageService, useValue: spyErrorMessage },
        { provide: GridService, useValue: spyGridService },
        {
          provide: TagService, useClass: class {
            retrieveTags() {
              return of(['tag1', 'tag2']);
            }
          },
        }],
    });
    injector = getTestBed();
    service = injector.get(SaveDrawingService);
    errorMessageSpy = injector.get(ErrorMessageService);
    gridServiceSpy = injector.get(GridService);
    saveRequestSpy = injector.get(SaveRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tags', () => {
    expect(service.getAllTags()).toEqual(['tag1', 'tag2']);
  });

  it('#reset should reset the values for the save drawing service', () => {
    service.reset();
    expect(service.tagCtrl.untouched).toBeTruthy();
    expect(service.nameCtrl.untouched).toBeTruthy();
    expect(service.tags.length).toEqual(0);
  });

  it('#add should not add a tag in the list of tags when the tag exist', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.value = 'tag1';
    const value = 'tag1';
    const intialLength: number = service.tags.length;
    service.tags = ['tag1'];
    service.tagCtrl.setValue('tag1');
    service.add({ input, value }, false);
    expect(service.tags.length).toEqual(intialLength);
  });

  it('#add should add a tag in the list of tags', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.value = 'VALUE';
    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, false);
    expect(service.tagCtrl.value).toBeNull();
    expect(service.tags.includes(value.trim())).toBeTruthy();
    expect(input.value).toEqual('');
  });

  it('#add should add a tag in the list of tags without changing input', () => {
    const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;

    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, false);
    expect(service.tagCtrl.value).toBeNull();
    expect(service.tags.includes(value.trim())).toBeTruthy();
  });

  it('#add should not add a tag in the list of tags if matAutoCompletIsOpen', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.value = 'VALUE';
    const value = 'test';
    service.tagCtrl.setValue('val');
    service.add({ input, value }, true);
    expect(service.tagCtrl.value).not.toBeNull();
    expect(service.tags.includes(value.trim())).toBeFalsy();
    expect(input.value).toEqual('VALUE');
  });

  it('#remove should remove the tag if it exist', () => {
    service.tags = ['tag1', 'tag2'];
    service.remove('tag2');
    expect(service.tags).toEqual(['tag1']);
  });

  it('#remove should not remove the tag if it doesnt exist', () => {
    service.tags = ['tag1', 'tag2'];
    service.remove('tag3');
    expect(service.tags).toEqual(['tag1', 'tag2']);
  });

  it('#save should save the drawing if there is no error', async () => {
    saveRequestSpy.addDrawing.and.returnValue(new Promise<void>((resolve) => resolve()));
    const res: boolean = await service.save();
    expect(res).toBeTruthy();
  });

  it('#save should save the drawing if there is an error', async () => {
    saveRequestSpy.addDrawing.and.throwError('ERROR');
    const res: boolean = await service.save();
    expect(errorMessageSpy.showError).toHaveBeenCalled();
    expect(res).toBeFalsy();
  });

  it('#save should save the drawing without the grid', async () => {
    gridServiceSpy.activerGrille.setValue(true);
    saveRequestSpy.addDrawing.and.returnValue(new Promise<void>((resolve) => resolve()));
    await service.save();
    expect(gridServiceSpy.hideGrid).toHaveBeenCalledBefore(gridServiceSpy.showGrid);
  });

  it('#selected should push the tag value', () => {
    service.selected('Tag8');
    expect(service.tags.includes('Tag8')).toBeTruthy();
    expect(service.tagCtrl.value).toBeNull();
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
});
