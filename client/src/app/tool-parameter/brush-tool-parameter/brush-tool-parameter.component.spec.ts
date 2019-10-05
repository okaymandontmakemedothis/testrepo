import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from 'src/app/app-material.module';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { BrushToolService } from 'src/app/services/tools/brush-tool/brush-tool.service';
import { BrushToolParameterComponent } from './brush-tool-parameter.component';

describe('BrushToolParameterComponent', () => {
  let component: BrushToolParameterComponent;
  let fixture: ComponentFixture<BrushToolParameterComponent>;
  let brushToolService: BrushToolService;
  let texturesService: TexturesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrushToolParameterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, BrowserAnimationsModule,
        MaterialModules],
    })
      .compileComponents();
    brushToolService = TestBed.get(BrushToolService);
    texturesService = TestBed.get(TexturesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolParameterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the tool name', () => {
    expect(component.toolName).toEqual(brushToolService.toolName);
  });

  it('should return the list of texture', () => {
    expect(component.listTexture).toEqual(texturesService.textureOptionList);
  });

  it('should return the selected texture', () => {
    expect(component.selectedTexture).toEqual(brushToolService.texture.value);
  });

  it('should return the stroke width value', () => {
    expect(component.strokeWidthValue).toEqual(brushToolService.strokeWidth.value);
  });
});
