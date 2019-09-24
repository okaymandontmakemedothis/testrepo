<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../../services/drawer/drawer.service';
=======
import { Component, ElementRef, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
>>>>>>> master

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {

<<<<<<< HEAD
   width: string;
   height: string;

  constructor(private drawerService: DrawerService) {
  }

  ngOnInit() {

    this.height = this.drawerService.drawerheight;
    this.width = this.drawerService.drawerwidth;

    // construire la zone de dessin
    this.buildDessinArea();

  }

  buildDessinArea() {

    const container = document.querySelector('.dessincontainer') as HTMLElement;
    container.style.width =  this.width;
    container.style.height =  this.height;
    container.style.backgroundColor = 'violet';

=======
  constructor(private el: ElementRef, private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.workspaceService.el = this.el;
>>>>>>> master
  }
}
