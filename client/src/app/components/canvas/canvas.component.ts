import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
@Input() height:string;
  constructor() { }

  ngOnInit() {
  }

}
