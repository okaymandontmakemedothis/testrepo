import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ToolIconComponent } from './tool-icon.component';

describe('ToolIconComponent', () => {
  let component: ToolIconComponent;
  let fixture: ComponentFixture<ToolIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolIconComponent,
        FaIconComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
