import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToolsColorPickerComponent } from '../tools-color-picker/tools-color-picker.component';
import { ToolsColorService } from '../tools-color.service';

enum ColorType {
  primary,
  secondary,
}

@Component({
  selector: 'app-tools-color',
  templateUrl: './tools-color.component.html',
  styleUrls: ['./tools-color.component.scss'],
})
export class ToolsColorComponent implements OnInit {

  width = 50;
  height = 50;

  primarySize = {
    x: 20,
    y: 20,
    width: 30,
    height: 30,
  };

  secondarySize = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
  };

  constructor(private toolsColor: ToolsColorService, public dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(colorType: ColorType): void {
    let dialogRef: MatDialogRef<ToolsColorPickerComponent>;
    switch (colorType) {
      case ColorType.primary:
        dialogRef = this.dialog.open(ToolsColorPickerComponent, {
          width: '250px',
          data: { rgb: this.toolsColor.primaryColor, a: this.toolsColor.primaryAlpha },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.toolsColor.setPrimaryColor(result.rgb, result.a);
        });
        break;
      case ColorType.secondary:
        dialogRef = this.dialog.open(ToolsColorPickerComponent, {
          width: '250px',
          data: { rgb: this.toolsColor.secondaryColor, a: this.toolsColor.secondaryAlpha },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.toolsColor.setSecondaryColor(result.rgb, result.a);
        });
        break;
      default:
        break;
    }
  }

  get primaryColor(): string {
    return this.toolsColor.primaryColorString;
  }

  get primaryAlpha(): number {
    return this.toolsColor.primaryAlpha;
  }

  get secondaryColor(): string {
    return this.toolsColor.secondaryColorString;
  }

  get secondaryAlpha(): number {
    return this.toolsColor.secondaryAlpha;
  }

  switchColor(): void {
    this.toolsColor.switchColor();
  }

  onMouseClickPrimary(event: MouseEvent): void {
    this.openDialog(ColorType.primary);
    console.log('primary');
  }

  onMouseClickSecondary(event: MouseEvent): void {
    this.openDialog(ColorType.secondary);
    console.log('secondary');
  }


}
