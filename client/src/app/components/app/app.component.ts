import { Component, OnInit } from '@angular/core';
import { OpenWelcomeService } from 'src/app/services/openWelcome/open-welcome.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor( private openService: OpenWelcomeService) { }

  // Ouvre le mat dialog lorsque le browser est initialiser si le checkbox est non cocher
  ngOnInit() {
    this.openService.openOnStart();
  }

  /// Detruit le subscribe du welcomeDialogSub

}
