import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { AideDialogComponent } from './components/welcome-dialog/aide-dialog/aide-dialog.component';
import { DialogComponent } from './components/welcome-dialog/dialog/dialog.component';
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
