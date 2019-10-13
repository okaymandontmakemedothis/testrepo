import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { SaveDrawingService } from 'src/app/services/save-drawing/save-drawing.service';

@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrls: ['./save-drawing.component.scss'],
})
<<<<<<< HEAD
export class SaveDrawingComponent { // implements AfterViewInit {

  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // separatorKeysCodes: number[] = [ENTER, COMMA];

  // @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  // @ViewChild('svg', { static: false }) svg: ElementRef;

  // constructor(
  //   public dialogRef: MatDialogRef<SaveDrawingComponent>,
  //   private saveDrawingService: SaveDrawingService,
  //   private drawingService: DrawingService,
  //   private renderer: Renderer2,
  // ) {

  // }

  // ngAfterViewInit(): void {
  //   this.dialogRef.afterOpened().subscribe(() => {
  //     //const svgString = this.drawingService.drawString();
  //     this.renderer.setAttribute(this.svg.nativeElement, 'viewBox', '0 0 ' + this.drawingService.width + ' ' + this.drawingService.height);
  //    // this.svg.nativeElement.innerHTML = svgString;
  //   });
  // }

  // get nameCtrl(): FormControl {
  //   return this.saveDrawingService.nameCtrl;
  // }

  // get tags(): string[] {
  //   return this.saveDrawingService.tags;
  // }

  // get tagCtrl(): FormControl {
  //   return this.saveDrawingService.tagCtrl;
  // }

  // get filteredTags(): Observable<string[]> {
  //   return this.saveDrawingService.filteredTags;
  // }

  // get saveEnabled(): boolean {
  //   return this.saveDrawingService.saveEnabled;
  // }

  // add(event: MatChipInputEvent): void {
  //   this.saveDrawingService.add(event, this.matAutocomplete.isOpen);
  // }

  // remove(tag: string): void {
  //   this.saveDrawingService.remove(tag);
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.saveDrawingService.selected(event.option.viewValue);
  //   this.tagInput.nativeElement.value = '';
  // }

  // save(): void {
  //   this.saveDrawingService.save().then(() => { this.dialogRef.close(); });

  // }

  // close(): void {
  //   this.dialogRef.close();
  // }
=======
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
      // const svgString = this.drawingService.drawString();
      this.renderer.setAttribute(this.svg.nativeElement, 'viewBox', '0 0 ' + this.drawingService.width + ' ' + this.drawingService.height);
      // this.svg.nativeElement.innerHTML = svgString;
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
    this.saveDrawingService.save().then(() => { this.dialogRef.close(); });

  }

  close(): void {
    this.dialogRef.close();
  }
>>>>>>> d5aeac0be2dc6736aa2d9e4b427bf31d086d4086

}
