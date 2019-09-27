import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BrushToolService, TextureOptions } from 'src/app/services/tools/brush-tool/brush-tool.service';

@Component({
  selector: 'app-brush-tool-parameter',
  templateUrl: './brush-tool-parameter.component.html',
  styleUrls: ['./brush-tool-parameter.component.scss'],
})
export class BrushToolParameterComponent implements OnInit {

  form: FormGroup;

  constructor(private brushToolService: BrushToolService) { }

  ngOnInit() {
    this.form = this.brushToolService.parameters;
  }

  get listTexture(): TextureOptions[] {
    return this.brushToolService.textureList;
  }

}
