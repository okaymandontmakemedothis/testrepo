import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../../services/drawer/drawer.service';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

   width:string;
   height:string;

  constructor(private drawerService:DrawerService) {
  }


  ngOnInit() {

    this.height=this.drawerService.drawerheight;
    this.width=this.drawerService.drawerwidth;


    //construire la zone de dessin
    this.buildDessinArea();

  }


  buildDessinArea(){

    let container=<HTMLElement>document.querySelector(".dessincontainer");
    container.style.width =  this.width;
    container.style.height =  this.height;
    container.style.backgroundColor="violet";


  }
}
