import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EtampeStyle } from 'src/app/model/etampe-style.model';
import { EtampeToolService } from 'src/app/services/tools/etampe-tool/etampe-tool.service';

const SMILEY = 0;
const SAD = 1;
const FROWNY = 2;
const HEART = 3;
const UP = 4;
const GHOST = 5;
const TONGUE = 6;
const KISS = 7;
const defaultNumber = 100;

@Component({
  selector: 'app-etampe-tool-parameter',
  templateUrl: './etampe-tool-parameter.component.html',
  styleUrls: ['./etampe-tool-parameter.component.scss'],
})
export class EtampeToolParameterComponent implements OnInit {
  constructor(private etampeToolService: EtampeToolService) { }

  get toolName(): string {
    return this.etampeToolService.toolName;
  }

  form: FormGroup;
  currentEtampe = defaultNumber;
  styles: EtampeStyle[] = [
    {id: SMILEY,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Face_Emoji_large.png?v=1480481056',
      tooltip: 'content', },
    {id: SAD,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png?v=1480481055',
      tooltip: 'triste', },
    {id: FROWNY,
      url: 'http://cdn.shopify.com/s/files/1/1061/1924/products/Very_Mad_Emoji_grande.png?v=1480481060',
      tooltip: 'facher', },
    {id: HEART,
      url: 'https://cdn.emojidex.com/emoji/seal/heart.png?1417137894',
      tooltip: 'coeur', },
    {id: UP,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Hand_Sign_Emoji_large.png?v=1480481047',
      tooltip: 'pouce', },
    {id: GHOST,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Ghost_Emoji_large.png?v=1480481053',
      tooltip: 'fantome', },
    {id: TONGUE,
      url: 'http://cdn.shopify.com/s/files/1/1061/1924/products/' +
      'Tongue_Out_Emoji_with_Winking_Eye_876290ec-609b-498e-84ae-b195218ea438_grande.png?v=1480481058',
      tooltip: 'Grimace', },
    {id: KISS,
      url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Kiss_Emoji_Icon_2_large.png?v=1542435998',
      tooltip: 'Bisou',
    },
  ];

  ngOnInit(): void {
    this.form = this.etampeToolService.parameters;
  }
  selectEtampe(id: number): void {
    if (id !== this.currentEtampe) {
      this.currentEtampe = id;
      this.form.patchValue({
      etampe: this.styles[this.currentEtampe].url,
    });
    } else {
      this.currentEtampe = defaultNumber;
      this.form.patchValue({
        etampe: '',
      });
    }
  }

  get scaleValue() {
    return (this.form.get('facteurSize') as FormControl).value;
  }
}
