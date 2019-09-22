import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MccSpeedDialModule } from 'material-community-components';
import { MaterialModules } from './app.material-modules';
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
import { DrawerService } from './services/drawer/drawer.service';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModules,
    FontAwesomeModule,
    MccSpeedDialModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
    IconGroupAuthentificatorService,
    IconTranslatorService,
    DrawerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconTranslatorService: IconTranslatorService) {
    console.log('from app.module.ts' + this.iconTranslatorService.translate('coffee'));
  }
}
