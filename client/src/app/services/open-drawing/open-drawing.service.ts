import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { NewDrawingAlertComponent } from 'src/app/components/new-drawing/new-drawing-alert/new-drawing-alert.component';
import { OpenDrawingComponent } from 'src/app/components/open-drawing/open-drawing.component';
import { RGBA } from 'src/app/model/rgba.model';
// import { IndexService } from '../index/index.service';
import { environment } from 'src/environments/environment.prod';
import { Drawing } from '../../../../../common/communication/drawing';
import { DrawingService } from '../drawing/drawing.service';
import { TagService } from '../tag/tag.service';
import { GetDrawingRequestService } from '../get-drawing-request/get-drawing-request.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  selectedDrawing: Drawing | null;

  tagCtrl = new FormControl();

  filteredTags: Observable<string[]>;
  selectedTags: string[] = [];
  allTags: string[] = [];

  constructor(private getDrawingRequestService: GetDrawingRequestService, public dialog: MatDialog, private tagService: TagService, private drawingService: DrawingService) {
    this.selectedTags = [];
    this.tagService.retrieveTags().subscribe((tags: string[]) => this.allTags = tags);
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));

  }
  selectDrawing(drawing: Drawing) {
    this.selectedDrawing = drawing;
  }
  getDrawings(): Observable<Drawing[]> {
    return this.getDrawingRequestService.getDrawings()

  }
  getBackgroundSelected(drawing: Drawing): string {
    return (this.selectedDrawing && this.selectedDrawing.name === drawing.name) ? 'grey' : 'white';
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
      this.selectedDrawing = null;

    }
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
    this.selectedDrawing = null;

  }
  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  reset(): void {
    this.selectedTags = [];
    this.selectedDrawing = null;

  }
    // Selecting a tag from suggestion
  selectTag(tagName: string): void {
    this.selectedTags.push(tagName);
    this.tagCtrl.setValue(null);
    this.selectedDrawing = null;

  }

    // ouvre un nouveau dessin  avec l'ancien drawing
    accept(dialogRef: MatDialogRef<OpenDrawingComponent>, matAutocompleteIsOpen: Boolean): void {
      if (!this.selectedDrawing) { return; }
      if (this.drawingService.isCreated) {
        const alert = this.dialog.open(NewDrawingAlertComponent, {
          role: 'alertdialog',
        });
        alert.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.openDrawing(dialogRef, matAutocompleteIsOpen);
          }
        });
      } else {
        this.openDrawing(dialogRef, matAutocompleteIsOpen);
      }
    }

    openDrawing(dialogRef: MatDialogRef<OpenDrawingComponent>, matAutocompleteIsOpen: Boolean): void {
      if (!this.selectedDrawing) { return; }
      this.drawingService.isCreated = true;
      this.drawingService.openDrawing(this.selectedDrawing);
      dialogRef.close();
    }

}
