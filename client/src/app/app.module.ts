
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './app.material-modules';
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


@NgModule({
  declarations: [
    AppComponent,
    /*NewDrawingComponent,
    ColorPickerComponent,
    NewDrawingFormComponent,
    ColorSliderComponent,
    ColorPaletteComponent,
    ColorOpacityComponent,
    ColorRgbaHexComponent,*/
    // WelcomeDialogComponent,
    DialogComponent,
    AideDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
    WelcomeDialogModule,
  ],
  exports: [
    //ColorPickerComponent,
  ],
  entryComponents: [
    //NewDrawingComponent, 
    // WelcomeDialogComponent,
    DialogComponent, AideDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
