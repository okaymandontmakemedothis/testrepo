import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './menu/menu.component';
import { CanvasComponent } from './canvas/canvas.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CanvasComponent,
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
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
