import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  faIcon = faCoffee;
  items: {text: string}[] = [
    {text: 'element1'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
