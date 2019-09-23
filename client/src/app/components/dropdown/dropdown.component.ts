import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  items: {text: string}[] = [
    {text: 'element1'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
