import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError, startWith, map } from 'rxjs/operators';
import { RGBA } from 'src/app/model/rgba.model';
// import { IndexService } from '../index/index.service';
import { environment } from 'src/environments/environment.prod';
import { Drawing } from '../../../../../common/communication/drawing';
import { TagService } from '../tag/tag.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  tagCtrl = new FormControl();

  filteredTags: Observable<string[]>;
  selectedTags: string[] = [];
  allTags: string[] = [];



  constructor(private http: HttpClient, public dialog: MatDialog,private tagService: TagService) {
    this.selectedTags = [];
    this.tagService.retrieveTags().subscribe((tags: string[]) => this.allTags = tags);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));

  }
  getDrawings(): Observable<Drawing[]> {
    console.log('called');
    return this.http.get<Drawing[]>(environment.serverURL + '/drawings/').pipe(
      catchError(() => of([])),
    );

  }
  getBackground(drawing: Drawing): string {
    const rgba: RGBA = drawing.backGroundColor;
    return `rgba(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b},${rgba.a})`;
  }

  add(event: MatChipInputEvent, isMatAutoCompleteOpen: boolean): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (isMatAutoCompleteOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        if (!this.selectedTags.includes(value.trim())) {
          this.selectedTags.push(value.trim());
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
    // this.dataSource.filter = this.selectedTags.toString();
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }

  }
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  reset():void{
    this.selectedTags = [];

  }

}
