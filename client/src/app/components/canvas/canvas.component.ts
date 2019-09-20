import { Component, OnInit } from '@angular/core';
import { ToolsListService } from 'src/app/services/tools/tools-list.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private tools:ToolsListService) {}

  mouseDown(){
    this.tools.toolsList[this.tools.toolSelectedID].onPressed();
  }

  ngOnInit() {
  }

}
