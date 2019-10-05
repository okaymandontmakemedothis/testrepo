import { Component, OnInit } from '@angular/core';
import { EtampeToolService } from 'src/app/services/tools/etampe-tool/etampe-tool.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EtampeStyle } from 'src/app/model/etampe-style.model';

const SMILEY = 0;
const SAD = 1;
const FROWNY = 2;
const HEART = 3;
const UP = 4;

@Component({
  selector: 'app-etampe-tool-parameter',
  templateUrl: './etampe-tool-parameter.component.html',
  styleUrls: ['./etampe-tool-parameter.component.scss']
})
export class EtampeToolParameterComponent implements OnInit{
  constructor(private etampeToolService: EtampeToolService) { }
  get toolName(): string {
    return this.etampeToolService.toolName;
  }
  
  form: FormGroup;
  currentEtampe = 0;
  styles: EtampeStyle[] = [
    {
      id: SMILEY,
      url: 'https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_960_720.png',
      tooltip: 'content',
    },
    {
      id: SAD,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png?v=1480481055',
      tooltip: 'triste',
    },
    {
      id: FROWNY,
      url: 'http://cdn.shopify.com/s/files/1/1061/1924/products/Very_Mad_Emoji_grande.png?v=1480481060',
      tooltip: 'facher',
    },
    {
      id: HEART,
      url: 'https://images.emojiterra.com/google/android-pie/512px/2764.png',
      tooltip: 'coeur',
    },
    {
      id: UP,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Hand_Sign_Emoji_large.png?v=1480481047',
      tooltip: 'pouce',
    },
  ];

  ngOnInit(): void {
    this.form = this.etampeToolService.parameters;
  }
  selectEtampe(id: number): void {
    this.currentEtampe = id;
    this.form.patchValue({
      etampe: this.styles[this.currentEtampe].url,
    });
  }

  get scaleValue() {
    return (this.form.get('facteur') as FormControl).value;
  }
}
