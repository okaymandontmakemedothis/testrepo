import { TestBed } from '@angular/core/testing';

import { WorkspaceService } from '../workspace/workspace.service';
import { OffsetManagerService } from './offset-manager.service';

class MockNativeElement {
  getBoundingClientRect(): { x: number, y: number } {
    return { x: 10, y: 15 };
  }
}

describe('OffsetManagerService', () => {
  let service: OffsetManagerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        // tslint:disable-next-line: max-classes-per-file
        provide: WorkspaceService, useClass: class {
          scrolledElement = {
            nativeElement: { scrollLeft: 5, scrollTop: 10 },
          };
          el = { nativeElement: new MockNativeElement() };
        },
      },
      ],
    });
    service = TestBed.get(OffsetManagerService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should return the offset from the element of workspace service', () => {
    const mouseEvent: MouseEvent = new MouseEvent('mousedown');
    spyOnProperty(mouseEvent, 'pageX').and.returnValue(40);
    spyOnProperty(mouseEvent, 'pageY').and.returnValue(50);
    const offset: { x: number, y: number } = service.offsetFromMouseEvent(mouseEvent);
    expect(offset.x).toBe(40 - 10 + 5);
    expect(offset.y).toBe(50 - 15 + 10);
  });
});
