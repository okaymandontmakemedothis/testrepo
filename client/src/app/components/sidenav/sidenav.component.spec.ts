import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModules } from 'src/app/app.material-modules';
import { ToolIconComponent } from '../tool-icon/tool-icon.component';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent,
        ToolIconComponent,
      ],
      imports: [
        MaterialModules,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
