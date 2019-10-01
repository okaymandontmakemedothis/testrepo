import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { BrushToolService } from 'src/app/services/tools/brush-tool/brush-tool.service';
import { BrushToolParameterComponent } from './brush-tool-parameter.component';

describe('BrushToolParameterComponent', () => {
  let component: BrushToolParameterComponent;
  let fixture: ComponentFixture<BrushToolParameterComponent>;
  let brushToolServiceSpy: jasmine.SpyObj<BrushToolService>;
  let textureServiceSpy: jasmine.SpyObj<TexturesService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrushToolParameterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule,
        FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushToolParameterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const spyBrush = jasmine.createSpyObj('BrushToolService', ['']);
    const spyTexture = jasmine.createSpyObj('TexturesService', ['']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BrushToolService, useValue: spyBrush },
        { provide: TexturesService, useValue: spyTexture },
      ],
    });

    brushToolServiceSpy = TestBed.get(BrushToolService);
    textureServiceSpy = TestBed.get(TexturesService);

    brushToolServiceSpy.parameters.patchValue({ texture: 1 });

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the tool name', () => {
    expect(component.toolName).toEqual(brushToolServiceSpy.toolName);
  });

  it('should return the list of texture', () => {
    expect(component.listTexture).toEqual(textureServiceSpy.textureOptionList);
  });

  it('should return the selected texture', () => {
    expect(component.selectedTexture).toEqual(brushToolServiceSpy.texture.value);
  });

  it('should return the stroke width value', () => {
    expect(component.strokeWidthValue).toEqual(brushToolServiceSpy.strokeWidth.value);
  });
});