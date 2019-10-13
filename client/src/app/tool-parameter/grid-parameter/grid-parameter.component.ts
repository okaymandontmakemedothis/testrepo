import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridService } from 'src/app/services/tools/grid-tool/grid.sevice';

@Component({
  selector: 'app-grid-parameter',
  templateUrl: './grid-parameter.component.html',
  styleUrls: ['./grid-parameter.component.scss'],
})
export class GridParameterComponent implements OnInit {
  form: FormGroup;
  gridAlreadyCreated = false;
  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.form = this.gridService.parameters;
  }

  get cellSizeValue(): number {
    return (this.form.get('sizeCell') as FormControl).value;
  }

  get transparenceValue(): number {
    return (this.form.get('transparence') as FormControl).value;
  }

  get toolName(): string {
    return this.gridService.toolName;
  }
  changeOpacity() {
    this.gridService.changeOpacity();
  }
  changeGridSize() {
    this.gridService.changeGridSize();
  }

  onSelection(event: any) {
    console.log(event);
    if ((this.form.get('activerGrille') as FormControl).value === true) {
      if (this.gridAlreadyCreated === false) {
        this.gridService.createPatternGrid();
        this.gridAlreadyCreated = true;
      } else {
        this.gridService.changeOpacity();
      }
    } else {
      this.gridService.removeGrid();
    }
  }

}
