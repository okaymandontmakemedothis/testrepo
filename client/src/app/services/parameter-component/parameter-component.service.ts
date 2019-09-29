import { Injectable, Type } from '@angular/core';
import { ApplierToolParameterComponent } from 'src/app/components/applier-tool-parameter/applier-tool-parameter.component';
import { ControlMenuComponent } from 'src/app/components/control-menu/control-menu.component';
import { BrushToolParameterComponent } from '../../components/brush-tool-parameter/brush-tool-parameter.component';
import { PencilToolParameterComponent } from '../../components/pencil-tool-parameter/pencil-tool-parameter.component';
import { RectangleToolParameterComponent } from '../../components/rectangle-tool-parameter/rectangle-tool-parameter.component';

@Injectable({
  providedIn: 'root',
})
export class ParameterComponentService {

  componentList: Type<any>[] = [];
  constructor() {
    this.componentList.push(
      PencilToolParameterComponent,
      BrushToolParameterComponent,
      ApplierToolParameterComponent,
      RectangleToolParameterComponent,
      ControlMenuComponent,
    );
  }

  getComponent(index: number): Type<any> {
    return this.componentList[index];
  }
}
