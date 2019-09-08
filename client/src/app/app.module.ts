
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    NewDrawingComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
  ],
  exports: [
  ],
  entryComponents: [
    NewDrawingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
