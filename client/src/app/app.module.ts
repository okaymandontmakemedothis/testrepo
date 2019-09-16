import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModules } from './app.material-modules';
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParameterMenuComponent } from './components/parameter-menu/parameter-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolIconComponent } from './components/tool-icon/tool-icon.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
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
