import { Injectable, OnInit } from '@angular/core';
import { Tool } from './Tool';
import { SelectToolService } from './select-tool.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIcons } from 'src/assets/assets.icons';


@Injectable({
  providedIn: 'root'
})
export class FakeToolServiceService implements OnInit {

  constructor(private selectToolService: SelectToolService){
  }

  ngOnInit(){
    this.setTool(this.selectToolService.getIcon());
    console.log(this.tool.iconDefinition);
    console.log(this.tool.parameters);
  }

  tool: Tool;

  setTool(icon: IconDefinition): void{
    this.tool.iconDefinition = icon;
    this.tool.parameters = FaIcons.iconParameters.get(icon);
  }
}
