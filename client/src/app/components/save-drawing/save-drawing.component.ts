import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { SaveDrawingService } from 'src/app/services/save-drawing/save-drawing.service';

@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrls: ['./save-drawing.component.scss'],
})
export class SaveDrawingComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<SaveDrawingComponent>,
    private saveDrawingService: SaveDrawingService,
  ) { }

  get nameCtrl(): FormControl {
    return this.saveDrawingService.nameCtrl;
  }

  get tags(): string[] {
    return this.saveDrawingService.tags;
  }

  get tagCtrl(): FormControl {
    return this.saveDrawingService.tagCtrl;
  }

  get filteredTags(): Observable<string[]> {
    return this.saveDrawingService.filteredTags;
  }

  add(event: MatChipInputEvent): void {
    this.saveDrawingService.add(event, this.matAutocomplete.isOpen);
  }

  remove(tag: string): void {
    this.saveDrawingService.remove(tag);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.saveDrawingService.selected(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
  }

  save(): void {
    this.saveDrawingService.save();
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
