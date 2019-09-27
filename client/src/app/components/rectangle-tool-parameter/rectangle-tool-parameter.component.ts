import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToolRectangleService } from 'src/app/services/tools/tool-rectangle/tool-rectangle.service';
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rectangle-tool-parameter',
  templateUrl: './rectangle-tool-parameter.component.html',
  styleUrls: ['./rectangle-tool-parameter.component.scss']
})
export class RectangleToolParameterComponent implements OnInit {

  form: FormGroup;

  currentStyle: number = 0;

  styles: style[] = [
    new style(0, "fill", "Fill", faSquareFull),
    new style(1, "center", "Center", faSquareFull),
    new style(2, "border", "Border", faSquareFull)
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

class style {

  constructor(id: number, type: string, tip: string, icone: IconDefinition) {
    this.id = id;
    this.type = type;
    this.tip = tip;
    this.faIcone = icone;
  }

  id: number;
  type: string;
  tip: string;
  faIcone: IconDefinition;
}
