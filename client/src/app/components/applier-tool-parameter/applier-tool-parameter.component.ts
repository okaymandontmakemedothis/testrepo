import { Component } from '@angular/core';
import { ToolsApplierColorsService } from '../../services/tools/tools-applier-colors/tools-applier-colors.service';

@Component({
  selector: 'app-applier-tool-parameter',
  templateUrl: './applier-tool-parameter.component.html',
  styleUrls: ['./applier-tool-parameter.component.scss'],
})
export class ApplierToolParameterComponent {

  constructor(private applierToolService: ToolsApplierColorsService) { }

  get toolName(): string {
    return this.applierToolService.toolName;
  }
}
