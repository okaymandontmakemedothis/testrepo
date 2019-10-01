import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModules } from 'src/app/app-material.module';
import { WorkspaceComponent } from './workspace.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceComponent],
      imports: [MaterialModules],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
