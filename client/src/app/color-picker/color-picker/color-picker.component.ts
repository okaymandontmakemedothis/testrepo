import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  colorForm: FormGroup;

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.colorForm = this.colorPickerService.colorForm;
  }
}
