import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dialog.open(NewDrawingComponent, {
    });

  }
}
