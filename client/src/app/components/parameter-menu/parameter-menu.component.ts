import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ToggleDrawerService } from 'src/app/services/menu/toggle-drawer.service';

@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss'],
})
export class ParameterMenuComponent implements OnInit {

  constructor(private toggleDrawerService: ToggleDrawerService) { }
  @ViewChild(MatDrawer, { static: false }) child: MatDrawer;

  open() {
    this.child.open();
  }

  close() {
    this.child.close();
  }

  ngOnInit() {
    this.toggleDrawerService.openningEvent.subscribe(
      () => { this.open(); },
    );
  }
}
