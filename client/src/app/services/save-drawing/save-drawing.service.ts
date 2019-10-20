import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { Message } from '../../../../../common/communication/message';
import { ErrorMessageService } from '../error-message/error-message.service';
import { TagService } from '../tag/tag.service';
import { GridService } from '../tools/grid-tool/grid.service';

@Injectable({
  providedIn: 'root',
})
export class SaveDrawingService {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  nameCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  saveEnabled = true;

  constructor(
    private drawingService: DrawingService,
    private gridService: GridService,
    private tagService: TagService,
    private http: HttpClient,
    private errorMessage: ErrorMessageService,
  ) {
    this.nameCtrl.setValidators([Validators.required]);
    this.reset();
  }

  getAllTags(): string[] {
    return this.allTags;
  }

  reset(): void {
    this.tagCtrl.reset();
    this.nameCtrl.reset();
    this.tags = [];
    this.tagService.retrieveTags().subscribe((tags: string[]) => this.allTags = tags);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));
  }

  add(event: MatChipInputEvent, isMatAutoCompleteOpen: boolean): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!isMatAutoCompleteOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        if (!this.tags.includes(value.trim())) {
          this.tags.push(value.trim());
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(tagValue: string): void {
    this.tags.push(tagValue);
    this.tagCtrl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  async save(): Promise<boolean> {
    this.saveEnabled = false;
    if (this.gridService.activerGrille.value) {
      this.gridService.hideGrid();
    }
    const drawing: Drawing = {
      id: this.drawingService.id,
      name: this.nameCtrl.value,
      tags: this.tags,
      width: this.drawingService.width,
      height: this.drawingService.height,
      backGroundColor: { rgb: this.drawingService.color, a: this.drawingService.alpha },
      svg: this.drawingService.drawing.innerHTML,
    };
    if (this.gridService.activerGrille.value) {
      this.gridService.showGrid();
    }
    try {
      await this.http.post<Message>('http://localhost:3000/api/drawings/',
        drawing, { observe: 'response' },
      ).toPromise();
    } catch {
      this.errorMessage.showError('Test', 'Erreur de sauvegarde de dessin sur le serveur');
      this.saveEnabled = true;
      return false;
    }
    this.saveEnabled = true;
    this.drawingService.saved = true;
    return true;
  }
}
