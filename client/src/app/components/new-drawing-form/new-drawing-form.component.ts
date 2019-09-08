import { Component, HostListener, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-drawing-form',
  templateUrl: './new-drawing-form.component.html',
  // styleUrls: ['./new-drawing-form.component.scss'],
})
export class NewDrawingFormComponent implements OnInit {

  @Input() group: FormGroup;

  ngOnInit(): void {
  }

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.group.setValue({ width, height });
  }
}
