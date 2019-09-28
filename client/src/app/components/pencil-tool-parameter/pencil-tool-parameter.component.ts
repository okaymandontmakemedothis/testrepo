import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PencilToolService } from 'src/app/services/tools/pencil-tool/pencil-tool.service';

@Component({
  selector: 'app-pencil-tool-parameter',
  templateUrl: './pencil-tool-parameter.component.html',
  styleUrls: ['./pencil-tool-parameter.component.scss'],
})
export class PencilToolParameterComponent implements OnInit {

  form: FormGroup;

  constructor(private pencilToolService: PencilToolService) { }

  ngOnInit() {
    this.form = this.pencilToolService.parameters;
  }
}
