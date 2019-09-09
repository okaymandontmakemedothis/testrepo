import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './app.material-modules';
import { AideDialogComponent } from './components/aide-dialog/aide-dialog.component';
import { AppComponent } from './components/app/app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { WelcomeDialogComponent } from './components/welcome-dialog/welcome-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeDialogComponent,
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
  ],
  exports: [],
  entryComponents: [DialogComponent, AideDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
