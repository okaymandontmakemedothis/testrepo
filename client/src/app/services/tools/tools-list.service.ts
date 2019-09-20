import { Injectable } from '@angular/core';
import { ITools } from './ITools';
import { ToolRectangleService } from './tools-rectangle/tool-rectangle.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsListService {

  constructor() { 
    this.toolsList.push(new ToolRectangleService());
  }

  toolSelectedID:number = 1;

  toolsList:ITools[];
}
