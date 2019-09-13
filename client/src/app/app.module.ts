import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { ColorOpacityComponent } from './components/color-picker/color-opacity/color-opacity.component';
import { ColorPaletteComponent } from './components/color-picker/color-palette/color-palette.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorRgbaHexComponent } from './components/color-picker/color-rgba-hex/color-rgba-hex.component';
import { ColorSliderComponent } from './components/color-picker/color-slider/color-slider.component';
import { NewDrawingFormComponent } from './components/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { ToolComponent } from './components/tool/tool.component';
import { MenuComponent } from './menu/menu.component';
import { ParametersmenuComponent } from './parametersmenu/parametersmenu.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CanvasComponent } from './canvas/canvas.component';
@NgModule({
  declarations: [
    AppComponent,
    NewDrawingComponent,
    ColorPickerComponent,
    NewDrawingFormComponent,
    ColorSliderComponent,
    ColorPaletteComponent,
    ColorOpacityComponent,
    ColorRgbaHexComponent,
    ToolComponent,
    MenuComponent,
    ParametersmenuComponent,
    WorkspaceComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
    FontAwesomeModule,
  ],
  exports: [
    ColorPickerComponent,
  ],
  entryComponents: [
    NewDrawingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
