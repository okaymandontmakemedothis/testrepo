import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from 'src/app/app-material.module';
import { ParameterMenuComponent } from './parameter-menu.component';
import { ParameterDirective } from './parameter.directive';

describe('ParameterMenuComponent', () => {
  let component: ParameterMenuComponent;
  let fixture: ComponentFixture<ParameterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParameterMenuComponent, ParameterDirective,
      ],
      imports: [MaterialModules, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
