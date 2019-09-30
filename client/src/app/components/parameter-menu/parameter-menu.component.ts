import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ParameterComponentService } from 'src/app/services/parameter-component/parameter-component.service';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { PARAMETER_MENU_CONSTANT } from './parameter-menu-constant';
//import { ParameterDirective } from './parameter.directive';

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

  @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) myRef: ViewContainerRef;

  constructor(
    private toggleDrawerService: ToggleDrawerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private parameterComponentService: ParameterComponentService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectId) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    const componentFactory: ComponentFactory<any> =
      this.componentFactoryResolver.resolveComponentFactory(
        this.parameterComponentService.getComponent(this.selectId));
    //const viewContainerRef: ViewContainerRef = this.container.viewContainerRef;
    //viewContainerRef.clear();
    const ref = this.myRef.createComponent(componentFactory);
    ref.changeDetectorRef.detectChanges();
  }

  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }
}
