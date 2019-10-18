import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from 'src/app/app-material.module';
import { EtampeToolService } from 'src/app/services/tools/etampe-tool/etampe-tool.service';
import { EtampeToolParameterComponent } from './etampe-tool-parameter.component';

describe('EtampeToolParameterComponent', () => {
  let component: EtampeToolParameterComponent;
  let fixture: ComponentFixture<EtampeToolParameterComponent>;
  let etampeService: EtampeToolService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtampeToolParameterComponent ],
      imports: [ReactiveFormsModule,
        MatButtonToggleModule, BrowserAnimationsModule, MaterialModules],
    })
    .compileComponents();
    etampeService = TestBed.get(EtampeToolService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtampeToolParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch etampe value in form', () => {
    component.form = new FormGroup({ etampe: new FormControl('') });
    const spy = spyOn(component.form, 'patchValue');
    component.currentEtampe = 0;
    component.selectEtampe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should return the tool name', () => {
    expect(component.toolName).toEqual(etampeService.toolName);
  });

  it('should return the scale value', () => {
    const form = etampeService.parameters.get('facteurSize') as FormControl;
    form.patchValue(6);
    expect(component.scaleValue).toEqual(6);
  });

  it('form control etampe should equal empty string', () => {
    const form = etampeService.parameters.get('etampe') as FormControl;
    component.currentEtampe = 1;
    component.selectEtampe(1);
    expect(form.value).toEqual('');
  });

});
