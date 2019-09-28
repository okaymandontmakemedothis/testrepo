import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDrawerService {

  isOpened = true;

  open() {
    this.isOpened = true;
  }

  close() {
    this.isOpened = false;
  }

}
