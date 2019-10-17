import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../app-material.module';
import { ApplierToolParameterComponent } from './applier-tool-parameter/applier-tool-parameter.component';
import { BrushToolParameterComponent } from './brush-tool-parameter/brush-tool-parameter.component';
import { EllipseToolParameterComponent } from './ellipse-tool-parameter/ellipse-tool-parameter.component';
import { EtampeToolParameterComponent } from './etampe-tool-parameter/etampe-tool-parameter.component';
import { GridParameterComponent } from './grid-parameter/grid-parameter.component';
import { LineToolParameterComponent } from './line-tool-parameter/line-tool-parameter.component';
import { PencilToolParameterComponent } from './pencil-tool-parameter/pencil-tool-parameter.component';
import { PipetteToolParameterComponent } from './pipette-tool-parameter/pipette-tool-parameter.component';
import { RectangleToolParameterComponent } from './rectangle-tool-parameter/rectangle-tool-parameter.component';

@NgModule({
  declarations: [
    PencilToolParameterComponent,
    RectangleToolParameterComponent,
    BrushToolParameterComponent,
    ApplierToolParameterComponent,
    EllipseToolParameterComponent,
    PipetteToolParameterComponent,
    EtampeToolParameterComponent,
    GridParameterComponent,
    LineToolParameterComponent,
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
    EllipseToolParameterComponent,
    PipetteToolParameterComponent,
    EtampeToolParameterComponent,
    GridParameterComponent,

  ],
})
export class ToolParameterModule { }
