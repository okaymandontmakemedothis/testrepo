import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ParameterComponentService } from 'src/app/services/parameter-component/parameter-component.service';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { ParameterDirective } from './parameter.directive';

@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss'],
})
export class ParameterMenuComponent implements OnInit, OnChanges {
  @Input()
  toolid: number;

  @ViewChild(MatDrawer, { static: false })
  child: MatDrawer;

  @ViewChild(ParameterDirective, { static: true })
  parameterHost: ParameterDirective;

  constructor(private toggleDrawerService: ToggleDrawerService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private parameterComponentService: ParameterComponentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toolid) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.
      resolveComponentFactory(this.parameterComponentService.getComponent(this.toolid));
    const viewContainerRef = this.parameterHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

  open() {
    this.toggleDrawerService.open();
  }

  close() {
    this.toggleDrawerService.close();
  }

  ngOnInit() {
    this.toggleDrawerService.openningEvent.subscribe(
      () => { this.child.open(); },
    );
    this.toggleDrawerService.closingEvent.subscribe(
      () => { this.child.close(); },
    );
  }
}
