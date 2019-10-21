import { Component } from '@angular/core';
import { SelectionToolService } from 'src/app/services/tools/selection-tool/selection-tool.service';

@Component({
  selector: 'app-selection-tool-parameter',
  templateUrl: './selection-tool-parameter.component.html',
  styleUrls: ['./selection-tool-parameter.component.scss'],
})
export class SelectionToolParameterComponent {

  constructor(private selectionToolService: SelectionToolService) { }

  get toolName(): string {
    return this.selectionToolService.toolName;
  }

}
