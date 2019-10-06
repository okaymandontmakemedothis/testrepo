import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing, DrawingObject } from '../../../../../common/communication/drawing';

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
  allTags: string[] = ['Tag2', 'Tag3', 'Tag1', 'Tag4', 'Tag5'];
  saveEnabled = true;

  constructor(
    private drawingService: DrawingService,
    private http: HttpClient,
  ) {
    this.nameCtrl.setValidators([Validators.required]);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));
  }

  getAllTags(): string[] {
    return ['Tag2', 'Tag3', 'Tag1', 'Tag4', 'Tag5'];
  }

  add(event: MatChipInputEvent, isMatAutoCompleteOpen: boolean): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!isMatAutoCompleteOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
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

  async save(): Promise<void> {
    this.saveEnabled = false;
    const drawingObjectsList: DrawingObject[] = this.drawingService.drawingObjectList();
    const drawing: Drawing = {
      name: this.nameCtrl.value,
      tags: this.tags,
      drawingObjects: drawingObjectsList,
      width: this.drawingService.width,
      height: this.drawingService.height,
      backGroundColor: { rgb: this.drawingService.color, a: this.drawingService.alpha },
      thumbnail: this.drawingService.drawString(),
    };

    await this.http.post<string>('http://localhost:3000/api/drawings/',
     drawing,
  ).toPromise();
    this.saveEnabled = true;
    this.drawingService.isSaved = true;
  }
}
