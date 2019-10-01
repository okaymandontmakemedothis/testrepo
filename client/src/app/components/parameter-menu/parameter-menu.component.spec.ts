import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParameterMenuComponent } from './parameter-menu.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ParameterDirective } from './parameter.directive';
import { MaterialModules } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
