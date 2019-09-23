import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  width: number;
  height: number;

  ngOnInit() {

    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.buildWorkplaceArea();

  }


  private buildWorkplaceArea() {
    const container = document.querySelector('.dessincontainer') as HTMLElement;
    container.style.width = this.width.toString() + 'px';
    container.style.height = this.height.toString() + 'px';
  }
}
