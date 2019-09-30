import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appParameter]',
})
export class ParameterDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
