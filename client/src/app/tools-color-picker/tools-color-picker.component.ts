import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColorPickerComponent } from '../color-picker/color-picker/color-picker.component';
import { RGBA } from '../tools-color.model';
import { ToolsColorService } from '../tools-color.service';

@Component({
  selector: 'app-tools-color-picker',
  templateUrl: './tools-color-picker.component.html',
  styleUrls: ['./tools-color-picker.component.scss'],
})
export class ToolsColorPickerComponent implements AfterViewInit {
  @ViewChild(ColorPickerComponent, { static: false })
  colorPickerComponent: ColorPickerComponent;

  constructor(public dialogRef: MatDialogRef<ToolsColorPickerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RGBA, private toolsColor: ToolsColorService) { }

  ngAfterViewInit(): void {
    this.colorPickerComponent.resetForm();
    this.colorPickerComponent.setFormColor(this.data.rgb, this.data.a);
    this.colorPickerComponent.colorForm.valueChanges.subscribe((value) => {
      this.data.rgb = this.colorPickerComponent.rgb;
      this.data.a = this.colorPickerComponent.a;
    });
  }

  selectLastColor(rgba: RGBA): void {
    this.colorPickerComponent.setFormColor(rgba.rgb, rgba.a);
  }

  rgba2rgbstring(rgba: RGBA): string {
    return 'rgb(' + rgba.rgb.r + ',' + rgba.rgb.g + ',' + rgba.rgb.b + ')';
  }

  get lastColors(): RGBA[] {
    return this.toolsColor.lastSelectedColors.reverse();
  }

  close(): void {
    this.dialogRef.close();
  }
}
