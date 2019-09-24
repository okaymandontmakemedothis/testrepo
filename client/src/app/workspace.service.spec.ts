import { TestBed } from '@angular/core/testing';

import { ElementRef } from '@angular/core';
import { WorkspaceService } from './workspace.service';

describe('WorkspaceService', () => {

  let service: WorkspaceService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(WorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for width and height if el is not defined', () => {
    expect(service.width).toBe(0);
    expect(service.height).toBe(0);
  });

  it('should return 0 for width and height if el is not defined', () => {
    const el: ElementRef = new ElementRef(0);
    el.nativeElement.offsetHeight = 15;
    el.nativeElement.offsetWidth = 20;
    expect(service.width).toBe(20);
    expect(service.height).toBe(15);
  });
});
