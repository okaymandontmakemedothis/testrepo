import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrls: ['./tool-icon.component.scss'],
})
export class ToolIconComponent {
  @Input() faIcon: IconDefinition;
  @Input() ariaLabel: string;
}
