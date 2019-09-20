import { Injectable } from '@angular/core';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  id:number;

  onPressed(): Function {
    console.log("ca marche");
  }
  onRelease(): Function {
    throw new Error("Method not implemented.");
  }
  onMove(): Function {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
