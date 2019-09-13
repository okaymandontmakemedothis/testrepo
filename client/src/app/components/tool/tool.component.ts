import { Component, OnInit } from '@angular/core';
import { SvgStoreService } from 'src/app/services/svg-store/svg-store.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  constructor(private svgStoreService: SvgStoreService) { }

  ngOnInit() {
    this.svgStoreService.init();
  }

}
