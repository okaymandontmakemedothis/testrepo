import { Component, OnInit } from '@angular/core';
import { faShapes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconService } from 'src/app/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  faIcon: IconDefinition = faShapes;
  addSpeedDial: boolean;
  speedDialIconList: IconDefinition[] | undefined;

  constructor(private iconService: IconService) {
    this.iconService.setCurrentIcon(this.faIcon);
  }

  ngOnInit() {
    this.speedDialIconList = this.iconService.getSpeelDialIcons();
    this.addSpeedDial = this.speedDialIconList !== undefined ? true : false;
  }
}
