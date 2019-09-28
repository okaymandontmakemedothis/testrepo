import { Component, ComponentFactoryResolver, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ParameterComponentService } from 'src/app/services/parameter-component/parameter-component.service';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { PARAMETER_MENU_CONSTANT } from './parameter-menu-constant';
import { ParameterDirective } from './parameter.directive';

@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss'],
})
export class ParameterMenuComponent implements OnChanges {
  readonly width = PARAMETER_MENU_CONSTANT;

  @Input()
  selectId: number;

  @ViewChild(MatDrawer, { static: false })
  child: MatDrawer;

  @ViewChild(ParameterDirective, { static: true })
  parameterHost: ParameterDirective;

  constructor(private toggleDrawerService: ToggleDrawerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private parameterComponentService: ParameterComponentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectId) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.
      resolveComponentFactory(this.parameterComponentService.getComponent(this.selectId));
    const viewContainerRef = this.parameterHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);

  }

  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }
}
