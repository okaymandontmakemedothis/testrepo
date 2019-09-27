import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import { IconGroupAuthentificatorService } from 'src/app/services/icons/icon-group-authentificator.service';
import { SelectToolService } from 'src/app/services/tool/select-tool.service';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrls: ['./tool-icon.component.scss'],
})
export class ToolIconComponent implements OnInit {

  @Input() faIcon: IconDefinition;

  constructor(// private iconGroupAuthService: IconGroupAuthentificatorService,
    private selectService: SelectToolService) {
  }

  ngOnInit() {
    // this.iconGroupAuthService.setCurrentIcon(this.faIcon);
  }

  select() {
    this.selectService.setIcon(this.faIcon);
  }
}
