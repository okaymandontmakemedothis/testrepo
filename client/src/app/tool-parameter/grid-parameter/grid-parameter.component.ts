import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridColor } from 'src/app/model/grid-model';
import { GridService } from 'src/app/services/tools/grid-tool/grid.service';

const BLACK_ID = 0;
const WHITE_ID = 1;

@Component({
  selector: 'app-grid-parameter',
  templateUrl: './grid-parameter.component.html',
  styleUrls: ['./grid-parameter.component.scss'],
})
export class GridParameterComponent implements OnInit {
  form: FormGroup;
  gridAlreadyCreated = false;
  constructor(private gridService: GridService) { }
  currentColor = BLACK_ID;
  styles: GridColor[] = [
    {
      id: BLACK_ID,
      style: 'black',
      tooltip: 'Noir',
    },
    {
      id: WHITE_ID,
      style: 'white',
      tooltip: 'Blanc',
    },
  ];

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
  changeOpacityKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.gridService.changeOpacity();
    }
  }
  changeOpacityOnLostFocus() {
    this.gridService.changeOpacity();
  }
  changeGridSizeKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.gridService.changeGridSize();
    }
  }
  changeGridSizeOnLostFocus() {
    this.gridService.changeGridSize();
  }
  changeColor(id: number) {
    this.form.patchValue({
      color: this.styles[id].style,
    });
    this.gridService.changeColor();
  }

  onSelection() {
    console.log((this.form.get('activerGrille') as FormControl).value);
    if ((this.form.get('activerGrille') as FormControl).value === true) {
      this.gridService.showGrid();
    } else {
      this.gridService.hideGrid();
    }
  }

}
