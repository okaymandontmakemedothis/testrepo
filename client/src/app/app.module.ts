import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { AppComponent } from './components/app/app.component';
<<<<<<< HEAD
import { NewDrawingAlertComponent } from './components/new-drawing/new-drawing-alert/new-drawing-alert.component';
import { NewDrawingFormComponent } from './components/new-drawing/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';

=======
>>>>>>> master
@NgModule({
  declarations: [
    AppComponent,
    NewDrawingComponent,
    NewDrawingFormComponent,
    NewDrawingAlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
<<<<<<< HEAD
    ColorPickerModule,
=======
    FontAwesomeModule,
>>>>>>> master
  ],
  exports: [
  ],
  entryComponents: [
    NewDrawingAlertComponent,
    NewDrawingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
