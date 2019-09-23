import { Injectable} from '@angular/core';
import { ITools } from './ITools';
import { ToolPointerService } from './tool-pointer/tool-pointer.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { 
    this.toolsList.push(new ToolPointerService());
    this.toolsList.push(new ToolRectangleService());
    this.toolsList.push(new ToolsApplierColorsService());
  }

  toolSelected(id:number){
    this.toolSelectedID = id;
  }

  toolSelectedID:number = 0;

  toolsList:ITools[] = [];
}