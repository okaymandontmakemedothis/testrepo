import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { RectangleStyle } from 'src/app/model/reactangle-style.model';
import { ToolRectangleService } from 'src/app/services/tools/tool-rectangle/tool-rectangle.service';

@Component({
  selector: 'app-rectangle-tool-parameter',
  templateUrl: './rectangle-tool-parameter.component.html',
  styleUrls: ['./rectangle-tool-parameter.component.scss'],
})
export class RectangleToolParameterComponent implements OnInit {

  form: FormGroup;

  currentStyle = 0;

  styles: RectangleStyle[] = [
    { id: 0, type: 'fill', tooltip: 'Fill', faIcone: faSquareFull },
    { id: 1, type: 'center', tooltip: 'Center', faIcone: faSquareFull },
    { id: 2, type: 'border', tooltip: 'Border', faIcone: faSquareFull },
  ];

  selectStyle(id: number) {
    this.currentStyle = id;
    this.form.patchValue({
      rectStyle: this.styles[id].type,
    });
  }

  constructor(private rectangleToolService: ToolRectangleService) { }

  ngOnInit() {
    this.form = this.rectangleToolService.parameters;
  }

}
