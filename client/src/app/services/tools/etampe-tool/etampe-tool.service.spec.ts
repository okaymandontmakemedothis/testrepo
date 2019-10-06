import { TestBed } from '@angular/core/testing';
import { EtampeObject } from 'src/app/objects/object-etampe/etampe';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { EtampeToolService } from './etampe-tool.service';

describe('EtampeToolService', () => {
  let offsetManagerServiceSpy: jasmine.SpyObj<OffsetManagerService>;

  beforeEach(() => {
    const spyOffset = jasmine.createSpyObj('OffsetManagerService', ['offsetFromMouseEvent']);
    TestBed.configureTestingModule({
      providers: [
        { provide: OffsetManagerService, useValue: spyOffset } ],
  });
    offsetManagerServiceSpy = TestBed.get(OffsetManagerService);

});

  it('etampe service should be created', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    expect(service).toBeTruthy();
  });

  it('should create a stamp object on mouse press', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 0 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    expect(object).not.toBeNull();
  });

  it('should not create a stamp object on right mouse press ', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    offsetManagerServiceSpy.offsetFromMouseEvent.and.returnValue({ x: 0, y: 0 });
    const mouseEvent = new MouseEvent('click', { button: 1 });
    let object: EtampeObject | null = null;

    object = service.onPressed(mouseEvent) as EtampeObject;
    expect(object).toBeNull();
  });

  it('should return null on release', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mouseup');
    expect(service.onRelease(mouseEvent)).toBeNull();
  });

  it('should return null on move', () => {
    const service: EtampeToolService = TestBed.get(EtampeToolService);
    const mouseEvent = new MouseEvent('mousemove');
    expect(service.onMove(mouseEvent)).toBeNull();
  });
});
