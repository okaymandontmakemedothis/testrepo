import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MatTableDataSource, MatPaginator, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
// import { BehaviorSubject } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { RGBA } from 'src/app/model/rgba.model';
import { NewDrawingAlertComponent } from '../new-drawing/new-drawing-alert/new-drawing-alert.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagService } from 'src/app/services/tag/tag.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent implements OnInit {

  tagCtrl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pageIndex = 0;

  filteredTags: Observable<string[]>;
  selectedTags: string[] = [];
  allTags: string[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectedDrawing: Drawing | null;
  drawingPreview: Drawing[] = [];
  isLoaded = false;

  dataSource: MatTableDataSource<Drawing> = new MatTableDataSource<Drawing>();
  dataObs: BehaviorSubject<Drawing[]>;

  constructor(
    public dialogRef: MatDialogRef<OpenDrawingComponent>,
    private openDrawingService: OpenDrawingService,
    public drawingService: DrawingService,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private tagService: TagService,
  ) {
    this.dataSource = new MatTableDataSource<Drawing>();
    this.dialogRef.afterOpened().subscribe(() => {
      this.openDrawingService.getDrawings()
        .subscribe((drawings: Drawing[]) => {
          this.dataSource.data = drawings;
          this.drawingPreview = drawings;
          this.isLoaded = true;
          this.selectedTags = [];
          this.tagService.retrieveTags().subscribe((tags: string[]) => this.allTags = tags);
          this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => tag ? this.filter(tag) : this.allTags.slice()));
          this.dataSource.filter = '';
        });
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.isLoaded = false;
      this.selectedDrawing = null;
      this.selectedTags = [];
    });
  }

  ngOnInit(): void {
    console.log(this.paginator);
    this.dataSource.filterPredicate = ((data: Drawing, filter: string) => this.containsTag(data));

    this.dataObs = this.dataSource.connect();

  }

  ngOnDestroy(): void {
    if (this.dataSource) { this.dataSource.disconnect(); }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getBackground(drawing: Drawing): string {
    const rgba: RGBA = drawing.backGroundColor;
    return `rgba(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b},${rgba.a})`;
  }

  getThumbnail(drawingObject: Drawing) {
    const container: HTMLElement | null = document.getElementById(drawingObject.name);
    if (container) {
      const svgThumbnail: Element | null = container.children.item(0);

      if (svgThumbnail) {
        this.renderer.setAttribute(svgThumbnail, 'viewBox', `0 0 ${drawingObject.width} ${drawingObject.height}`);
        this.renderer.setAttribute(svgThumbnail, 'height', `100%`);
        this.renderer.setAttribute(svgThumbnail, 'width', `100%`);

        svgThumbnail.innerHTML = `${drawingObject.svg}`;
      }
    }
  }

  getBackgroundSelected(drawing: Drawing): string {
    return (this.selectedDrawing && this.selectedDrawing.name === drawing.name) ? 'grey' : 'white';
  }

  test() {
    this.dataSource.filter = Math.random().toString();
  }

  selectDrawing(drawing: Drawing) {
    this.selectedDrawing = drawing;
  }

  containsTag(drawing: Drawing): boolean {
    if (this.selectedTags.length < 1) {
      return true;
    }
    let containsTag = false;
    for (const tag of drawing.tags) {
      containsTag = this.selectedTags.includes(tag);
      if (containsTag) {
        return true;
      }
    }
    return false;
  }

  // ouvre un nouveau dessin  avec l'ancien drawing
  accept(): void {
    if (!this.selectedDrawing) { return; }
    if (this.drawingService.isCreated) {
      const alert = this.dialog.open(NewDrawingAlertComponent, {
        role: 'alertdialog',
      });
      alert.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.openDrawing();
        }
      });
    } else {
      this.openDrawing();
    }
  }

  openDrawing(): void {
    if (!this.selectedDrawing) { return; }
    this.drawingService.isCreated = true;
    this.drawingService.openDrawing(this.selectedDrawing);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
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
    this.selectedDrawing = null;
    this.dataSource.filter = this.selectedTags.toString();
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
    this.selectedDrawing = null;
    this.dataSource.filter = this.selectedTags.toString();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagCtrl.setValue(null);
    this.tagInput.nativeElement.value = '';
    this.selectedDrawing = null;
    this.dataSource.filter = this.selectedTags.toString();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
