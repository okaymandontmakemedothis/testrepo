import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IconService } from 'src/app/icon.service';
import { SelectToolService } from '../app/select-tool.service';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrls: ['./tool-icon.component.scss'],
})
export class ToolIconComponent implements OnInit {

  @Input() faIcon: IconDefinition;
  @Input() ariaLabel: string;
  addSpeedDial: boolean;
  speedDialIconList: IconDefinition[] | undefined;

  constructor(private iconService: IconService
    ,         private selectService: SelectToolService) {
  }

  ngOnInit() {
    this.iconService.setCurrentIcon(this.faIcon);
    this.speedDialIconList = this.iconService.getSpeelDialIcons();
    this.addSpeedDial = this.speedDialIconList !== undefined ? true : false;
  }

  select(){

  this.selectService.setIcone(this.faIcon);

  }
}
