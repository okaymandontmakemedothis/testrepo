import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import { IconGroupAuthentificatorService } from 'src/app/services/icons/icon-group-authentificator.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrls: ['./tool-icon.component.scss'],
})
export class ToolIconComponent implements OnInit {

  @Input() faIcon: IconDefinition;

  constructor(// private iconGroupAuthService: IconGroupAuthentificatorService,
             private toolsService: ToolsService) {
  }

  ngOnInit() {
    // this.iconGroupAuthService.setCurrentIcon(this.faIcon);
  }

  select($event: any) {
    this.toolsService.toolSelected($event);
  }
}
