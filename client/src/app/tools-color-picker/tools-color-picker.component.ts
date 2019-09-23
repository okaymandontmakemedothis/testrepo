import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColorPickerComponent } from '../color-picker/color-picker/color-picker.component';
import { RGBA } from '../tools-color.model';

@Component({
  selector: 'app-tools-color-picker',
  templateUrl: './tools-color-picker.component.html',
  styleUrls: ['./tools-color-picker.component.scss'],
})
export class ToolsColorPickerComponent implements AfterViewInit {
  @ViewChild(ColorPickerComponent, { static: false })
  colorPickerComponent: ColorPickerComponent;

  constructor(public dialogRef: MatDialogRef<ToolsColorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RGBA) { }

  ngAfterViewInit(): void {
    this.colorPickerComponent.resetForm();
    this.colorPickerComponent.setFormColor(this.data.rgb, this.data.a);
  }

  get rgba(): RGBA {
    const rgb = { r: 20, g: 120, b: 220 };//this.colorPickerComponent.rgb;
    const a = 1;//this.colorPickerComponent.a;
    return { rgb, a };
  }
}
