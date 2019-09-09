import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../../common/communication/message';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { IndexService } from '../../services/index/index.service';
import { Color } from 'src/app/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly title: string = 'PolyDessin E16';
  message = new BehaviorSubject<string>('');
  animal: string;

  constructor(private basicService: IndexService, private dialog: MatDialog) {
    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

      Color.colorWithRGBA(0,255,255,1);
  }

  openDialog() {
    this.dialog.open(NewDrawingComponent, {
    });
  }
}
