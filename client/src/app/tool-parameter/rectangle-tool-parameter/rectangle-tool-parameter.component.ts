import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RectangleStyle } from 'src/app/model/reactangle-style.model';
import { ToolRectangleService } from 'src/app/services/tools/tool-rectangle/tool-rectangle.service';

const FILL_ID = 0;
const CENTER_ID = 1;
const BORDER_ID = 2;

@Component({
  selector: 'app-rectangle-tool-parameter',
  templateUrl: './rectangle-tool-parameter.component.html',
  styleUrls: ['./rectangle-tool-parameter.component.scss'],
})
export class RectangleToolParameterComponent implements OnInit {

  form: FormGroup;

  currentStyle = 0;

  styles: RectangleStyle[] = [
    {
      id: FILL_ID, type: 'fill',
      tooltip: 'Fill',
    },
    {
      id: CENTER_ID,
      type: 'center',
      tooltip: 'Center',
    },
    {
      id: BORDER_ID,
      type: 'border',
      tooltip: 'Border',
    },
  ];

  selectStyle(id: number): void {
    this.currentStyle = id;
    this.form.patchValue({
      rectStyle: this.styles[id].type,
    });
  }

  constructor(private rectangleToolService: ToolRectangleService) { }

  ngOnInit(): void {
    this.form = this.rectangleToolService.parameters;
  }

  get toolName(): string {
    return this.rectangleToolService.toolName;
  }

}
