import { Injectable, Type } from '@angular/core';
import { ControlMenuComponent } from 'src/app/components/control-menu/control-menu.component';
import { ApplierToolParameterComponent } from 'src/app/tool-parameter/applier-tool-parameter/applier-tool-parameter.component';
import { BrushToolParameterComponent } from 'src/app/tool-parameter/brush-tool-parameter/brush-tool-parameter.component';
import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';
import { RectangleToolParameterComponent } from 'src/app/tool-parameter/rectangle-tool-parameter/rectangle-tool-parameter.component';

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
