import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrushToolParameterComponent } from 'src/app/tool-parameter/brush-tool-parameter/brush-tool-parameter.component';
import { PencilToolParameterComponent } from 'src/app/tool-parameter/pencil-tool-parameter/pencil-tool-parameter.component';
import { ControlMenuComponent } from '../control-menu/control-menu.component';
import { ParameterDirective } from '../parameter-menu/parameter.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ParameterDirective],
    entryComponents: [PencilToolParameterComponent, ControlMenuComponent, BrushToolParameterComponent],
})

export class SidenavModule { }
