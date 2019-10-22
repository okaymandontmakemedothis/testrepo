import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { SaveDrawingService } from 'src/app/services/save-drawing/save-drawing.service';

/// Component pour visualiser le tumbnail et enregistrer le dessin
@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrls: ['./save-drawing.component.scss'],
})
export class SaveDrawingComponent implements AfterViewInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild('svg', { static: false }) svg: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<SaveDrawingComponent>,
    private saveDrawingService: SaveDrawingService,
    private drawingService: DrawingService,
    private renderer: Renderer2,
  ) {

  }

  ngAfterViewInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.renderer.setAttribute(this.svg.nativeElement, 'viewBox', '0 0 ' + this.drawingService.width + ' ' + this.drawingService.height);
      this.renderer.setStyle(this.svg.nativeElement, 'background', this.drawingService.rgbaColorString);
      if (this.svg) {
        this.svg.nativeElement.innerHTML = this.drawingService.drawing.innerHTML;
      }
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.saveDrawingService.reset();
    });
  }

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

  get saveEnabled(): boolean {
    return this.saveDrawingService.saveEnabled;
  }

  /// Ajout d'un tag
  add(event: MatChipInputEvent): void {
    this.saveDrawingService.add(event, this.matAutocomplete.isOpen);
  }

  /// Retrait d'un tag
  remove(tag: string): void {
    this.saveDrawingService.remove(tag);
  }

  /// Selection d'un tag
  selected(event: MatAutocompleteSelectedEvent): void {
    this.saveDrawingService.selected(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
  }

  /// Enregistrement du dessin
  async save(): Promise<void> {
    const saveSucceed = await this.saveDrawingService.save();
    if (saveSucceed) {
      this.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
