import { Component, OnInit, ViewChild, Input, Type, OnChanges, SimpleChanges, ComponentFactoryResolver } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';
import { ParameterDirective } from './parameter.directive';

@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss'],
})
export class ParameterMenuComponent implements OnInit, OnChanges {
  @Input()
  component: Type<any>;

  @ViewChild(MatDrawer, { static: false })
  child: MatDrawer;

  @ViewChild(ParameterDirective, { static: true })
  parameterHost: ParameterDirective;

  constructor(private toggleDrawerService: ToggleDrawerService, private componentFactoryResolver: ComponentFactoryResolver) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.component) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.parameterHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

  toggle() {
    console.log('toggled');
    this.child.toggle();
  }
  close() {
    this.child.close();
  }
  ngOnInit() {
    this.toggleDrawerService.toggled.subscribe(
      () => { this.toggle(); },
    );
  }
}
