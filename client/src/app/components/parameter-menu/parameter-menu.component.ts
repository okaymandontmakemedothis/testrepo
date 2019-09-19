import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ToggleDrawerService } from 'src/app/toggle-drawer.service';


@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss']
})
export class ParameterMenuComponent implements AfterViewInit, OnInit {

  constructor(private toggleDrawerService: ToggleDrawerService){}
  @ViewChild(MatDrawer, {static: false}) child: MatDrawer;

  toggle() {
    console.log('toggled');
    this.child.toggle();
  }
  ngAfterViewInit() {
    console.log(this.child);
  }
  ngOnInit() {
    this.toggleDrawerService.toggled.subscribe(
      () => {this.toggle(); },
    );
  }
}
