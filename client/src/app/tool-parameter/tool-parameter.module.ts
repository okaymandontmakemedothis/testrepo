import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../app.material-modules';
import { ApplierToolParameterComponent } from './applier-tool-parameter/applier-tool-parameter.component';
import { BrushToolParameterComponent } from './brush-tool-parameter/brush-tool-parameter.component';
import { PencilToolParameterComponent } from './pencil-tool-parameter/pencil-tool-parameter.component';
import { RectangleToolParameterComponent } from './rectangle-tool-parameter/rectangle-tool-parameter.component';

@NgModule({
  declarations: [
    PencilToolParameterComponent,
    RectangleToolParameterComponent,
    BrushToolParameterComponent,
    ApplierToolParameterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
  ],
  exports: [
  ],
  entryComponents: [BrushToolParameterComponent,
    PencilToolParameterComponent,
    RectangleToolParameterComponent,
    ApplierToolParameterComponent,
  ],
})
export class ToolParameterModule { }
