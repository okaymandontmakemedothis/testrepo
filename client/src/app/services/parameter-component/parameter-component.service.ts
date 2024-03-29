import { Injectable, Type } from '@angular/core';
import { ControlMenuComponent } from 'src/app/components/control-menu/control-menu.component';
import { ApplierToolParameterComponent } from 'src/app/tool-parameter/applier-tool-parameter/applier-tool-parameter.component';
import { BrushToolParameterComponent } from 'src/app/tool-parameter/brush-tool-parameter/brush-tool-parameter.component';
import { EllipseToolParameterComponent } from 'src/app/tool-parameter/ellipse-tool-parameter/ellipse-tool-parameter.component';
import { EtampeToolParameterComponent } from 'src/app/tool-parameter/etampe-tool-parameter/etampe-tool-parameter.component';
import { GridParameterComponent } from 'src/app/tool-parameter/grid-parameter/grid-parameter.component';
import { LineToolParameterComponent } from 'src/app/tool-parameter/line-tool-parameter/line-tool-parameter.component';
import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';
import { PipetteToolParameterComponent } from 'src/app/tool-parameter/pipette-tool-parameter/pipette-tool-parameter.component';
import { PolygonToolParameterComponent } from 'src/app/tool-parameter/polygone-tool-parameter/polygone-tool-parameter.component';
import { RectangleToolParameterComponent } from 'src/app/tool-parameter/rectangle-tool-parameter/rectangle-tool-parameter.component';
import { SelectionToolParameterComponent } from 'src/app/tool-parameter/selection-tool-parameter/selection-tool-parameter.component';

/// Classe permettant d'offrir dyamiquement des component selon un index
@Injectable({
  providedIn: 'root',
})
export class ParameterComponentService {

  private parameterComponentList: Type<any>[] = [];
  constructor() {
    this.parameterComponentList.push(
      PencilToolParameterComponent,
      BrushToolParameterComponent,
      ApplierToolParameterComponent,
      RectangleToolParameterComponent,
      EllipseToolParameterComponent,
      PolygonToolParameterComponent,
      LineToolParameterComponent,
      PipetteToolParameterComponent,
      EtampeToolParameterComponent,
      GridParameterComponent,
      SelectionToolParameterComponent,
    );
    // Le push ce fait par la suite pour s'assurer qu'il s'agit de la derniere classe
    this.parameterComponentList.push(ControlMenuComponent);
  }

  /// Retourne le parameterComponent de l'index donner
  getComponent(index: number): Type<any> {
    return this.parameterComponentList[index];
  }
}
