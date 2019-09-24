import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterMenuComponent } from '../parameter-menu/parameter-menu.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        ParameterMenuComponent,
        SidenavComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
