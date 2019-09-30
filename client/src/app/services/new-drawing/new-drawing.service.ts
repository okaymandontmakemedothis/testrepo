import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { DrawingSizeValidatorService } from '../drawing-size-validator/drawing-size-validator.service';
import { DEFAULT_RGB_COLOR } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA } from 'src/app/model/rgba.model';

@Injectable()
export class NewDrawingService {

  form: FormGroup;
  private isSizeModified = false;

  constructor(
    private drawingSizeValidatorService: DrawingSizeValidatorService,
    private formBuilder: FormBuilder,
    private workspaceService: WorkspaceService,
  ) {
    this.form = this.formBuilder.group({
      size: this.formBuilder.group({
        width: 0,
        height: 0,
      }, {
        validator: this.drawingSizeValidatorService.formValidator(),
      }),
      rgb: this.formBuilder.group(DEFAULT_RGB_COLOR),
      a: this.formBuilder.control(DEFAULT_ALPHA),
    });
    this.sizeGroup.valueChanges.subscribe((size) => {
      this.isSizeModified = !(size.width === this.workspaceService.width && size.height === this.workspaceService.height);
      this.form.updateValueAndValidity();
    });
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.drawingSizeValidatorService.validateSize(this.form);
      return false;
    }
    return true;
  }

  get sizeGroup(): FormGroup {
    return this.form.get('size') as FormGroup;
  }

  onResize() {
    if (!this.isSizeModified) {
      this.sizeGroup.setValue({ width: this.workspaceService.width, height: this.workspaceService.height });
    }
  }
}
