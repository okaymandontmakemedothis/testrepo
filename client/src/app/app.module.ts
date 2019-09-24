import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { AppComponent } from './components/app/app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { NewDrawingAlertComponent } from './components/new-drawing/new-drawing-alert/new-drawing-alert.component';
import { NewDrawingFormComponent } from './components/new-drawing/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { ParameterMenuComponent } from './components/parameter-menu/parameter-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolIconComponent } from './components/tool-icon/tool-icon.component';
import { ToolsColorPickerComponent } from './components/tools-color-picker/tools-color-picker.component';
import { ToolsColorComponent } from './components/tools-color/tools-color.component';
import { AideDialogComponent } from './components/welcome-dialog/aide-dialog/aide-dialog.component';
import { DialogComponent } from './components/welcome-dialog/dialog/dialog.component';
import { WelcomeDialogModule } from './components/welcome-dialog/welcome-dialog.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ParameterMenuProviderService } from './services/menu/parameter-menu-provider.service';
import { SelectToolService } from './services/tool/select-tool.service';

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
    ParameterMenuComponent,
    WorkspaceComponent,
    ToolIconComponent,
    SidenavComponent,
    CanvasComponent,
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
  ],
  entryComponents: [
    DialogComponent, AideDialogComponent,
    NewDrawingAlertComponent,
    NewDrawingComponent,
    ToolsColorPickerComponent,
    WorkspaceComponent,

  ],
  providers: [
    SelectToolService,
    ParameterMenuProviderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
