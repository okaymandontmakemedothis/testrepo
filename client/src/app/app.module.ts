
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';

@NgModule({
  declarations: [
    AppComponent,
    NewDrawingComponent,
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
