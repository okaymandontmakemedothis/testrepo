import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-drawing-form',
  templateUrl: './new-drawing-form.component.html',
  styleUrls: ['./new-drawing-form.component.scss'],
})
export class NewDrawingFormComponent {

  @Input()
  sizeForm: FormGroup;

}
