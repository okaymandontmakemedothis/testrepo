import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PencilToolParameterComponent } from '../pencil-tool-parameter/pencil-tool-parameter.component';
import { ControlMenuComponent } from '../control-menu/control-menu.component';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    entryComponents: [PencilToolParameterComponent, ControlMenuComponent],
})

export class SidenavModule { }