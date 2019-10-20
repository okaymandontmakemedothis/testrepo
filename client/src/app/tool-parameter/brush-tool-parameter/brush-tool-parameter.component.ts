import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextureOptions } from 'src/app/model/texture-options.model';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { BrushToolService } from 'src/app/services/tools/brush-tool/brush-tool.service';

/// Le component d'affichage des paramètres du pinceau
@Component({
  selector: 'app-brush-tool-parameter',
  templateUrl: './brush-tool-parameter.component.html',
  styleUrls: ['./brush-tool-parameter.component.scss'],
})
export class BrushToolParameterComponent implements OnInit {

  form: FormGroup;

  constructor(private brushToolService: BrushToolService, private textureService: TexturesService) { }

  ngOnInit(): void {
    this.form = this.brushToolService.parameters;
  }

  get toolName(): string {
    return this.brushToolService.toolName;
  }

  get listTexture(): TextureOptions[] {
    return this.textureService.textureOptionList;
  }

  get selectedTexture() {
    return this.brushToolService.texture.value;
  }

  get strokeWidthValue() {
    return (this.form.get('strokeWidth') as FormControl).value;
  }

}
