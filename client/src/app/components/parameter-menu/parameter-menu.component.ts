import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToggleDrawerService } from 'src/app/toggle-drawer.service';


@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss']
})
export class ParameterMenuComponent implements AfterViewInit, OnInit {

  constructor(private toggleDrawerService: ToggleDrawerService){}
  @ViewChild('pog', {static: false}) child: ElementRef;
  toggle() {
    this.child.nativeElement.toggle();
  }
  ngAfterViewInit() {
    console.log(this.child.nativeElement);
  }
  ngOnInit() {
    this.toggleDrawerService.toggled.subscribe(
      () => {this.toggle(); },
    );
  }
}
