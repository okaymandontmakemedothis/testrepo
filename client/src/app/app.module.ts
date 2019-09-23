import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MccSpeedDialModule } from 'material-community-components';
import { MaterialModules } from './app.material-modules';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { AppComponent } from './components/app/app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParameterMenuComponent } from './components/parameter-menu/parameter-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolIconComponent } from './components/tool-icon/tool-icon.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { IconGroupAuthentificatorService } from './services/icons/icon-group-authentificator.service';
import { IconTranslatorService } from './services/icons/icon-translator.service';
import { NewDrawingAlertComponent } from './components/new-drawing/new-drawing-alert/new-drawing-alert.component';
import { NewDrawingFormComponent } from './components/new-drawing/new-drawing-form/new-drawing-form.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { AideDialogComponent } from './components/welcome-dialog/aide-dialog/aide-dialog.component';
import { DialogComponent } from './components/welcome-dialog/dialog/dialog.component';
import { WelcomeDialogModule } from './components/welcome-dialog/welcome-dialog.module';
import { ToolsColorPickerComponent } from './components/tools-color-picker/tools-color-picker.component';
import { ToolsColorComponent } from './components/tools-color/tools-color.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ParameterMenuComponent,
    WorkspaceComponent,
    ToolIconComponent,
    SidenavComponent,
    CanvasComponent,
    DropdownComponent,

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
    MccSpeedDialModule,
  ],
  exports: [
  ],
  entryComponents: [
    DialogComponent, AideDialogComponent,
    NewDrawingAlertComponent,
    NewDrawingComponent,
    ToolsColorPickerComponent,

  ],
  providers: [
    IconGroupAuthentificatorService,
    IconTranslatorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconTranslatorService: IconTranslatorService) {
    console.log('from app.module.ts' + this.iconTranslatorService.translate('coffee'));
  }
}
