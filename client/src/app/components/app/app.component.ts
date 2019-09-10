import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../../common/communication/message';
import { IndexService } from '../../services/index/index.service';
import { Color } from 'src/app/color';
import { NewDrawingComponent } from '../../components/new-drawing/new-drawing.component';
import { MatDialog } from '@angular/material/dialog';
import { HotkeysFichierService } from '../../services/hotkeys/hotkeys-fichier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly title: string = 'PolyDessin E16';
  message = new BehaviorSubject<string>('');
  animal: string;

  constructor(private basicService: IndexService, private dialog: MatDialog, private hotkeyService:HotkeysFichierService) {
    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

      let c: Color = Color.colorWithHex(0xffa00f);
      console.log(c.r + ' ' + c.g + ' ' + c.b)
  }

  openDialog() {
    this.dialog.open(NewDrawingComponent, {
    });
  }


  @HostListener('window:keydown', ['$event'])
  hotkey(event:KeyboardEvent){ this.hotkeyService.hotkeysFichier(event);}
}
