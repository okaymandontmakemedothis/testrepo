import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { AppComponent } from './components/app/app.component';
/*import { ColorOpacityComponent } from './components/color-picker/color-opacity/color-opacity.component';
import { ColorPaletteComponent } from './components/color-picker/color-palette/color-palette.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorRgbaHexComponent } from './components/color-picker/color-rgba-hex/color-rgba-hex.component';
import { ColorSliderComponent } from './components/color-picker/color-slider/color-slider.component';
import { NewDrawingFormComponent } from './components/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';*/
import { AideDialogComponent } from './components/welcome-dialog/aide-dialog/aide-dialog.component';
import { DialogComponent } from './components/welcome-dialog/dialog/dialog.component';
import { WelcomeDialogModule } from './components/welcome-dialog/welcome-dialog.module';

import { NewDrawingAlertComponent } from './components/new-drawing/new-drawing-alert/new-drawing-alert.component';
import { NewDrawingFormComponent } from './components/new-drawing/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { ToolsColorComponent } from './tools-color/tools-color.component';
import { ToolsColorPickerComponent } from './tools-color-picker/tools-color-picker.component';

@NgModule({
  declarations: [
    AppComponent,

    DialogComponent,
    AideDialogComponent,
    NewDrawingComponent,
    NewDrawingFormComponent,
    NewDrawingAlertComponent,
    ToolsColorComponent,
    ToolsColorPickerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
    WelcomeDialogModule,
    ColorPickerModule,
    FontAwesomeModule,
  ],
  exports: [
    // ColorPickerComponent,
  ],
  entryComponents: [
    // NewDrawingComponent,
    // WelcomeDialogComponent,
    DialogComponent, AideDialogComponent,
    NewDrawingAlertComponent,
    NewDrawingComponent,
    ToolsColorPickerComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
