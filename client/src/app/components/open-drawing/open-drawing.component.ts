import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent,
  MatDialog, MatDialogRef, MatPaginator, MatTableDataSource
} from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RGBA } from 'src/app/model/rgba.model';
// import { BehaviorSubject } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { OpenDrawingService } from 'src/app/services/open-drawing/open-drawing.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Drawing } from '../../../../../common/communication/drawing';
import { NewDrawingAlertComponent } from '../new-drawing/new-drawing-alert/new-drawing-alert.component';

@Component({
  selector: 'app-open-drawing',
  templateUrl: './open-drawing.component.html',
  styleUrls: ['./open-drawing.component.scss'],
})
export class OpenDrawingComponent implements OnInit, OnDestroy, AfterViewInit {

  // tagCtrl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pageIndex = 0;

  // filteredTags: Observable<string[]>;
  // selectedTags: string[] = [];
  // allTags: string[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // selectedDrawing: Drawing | null;
  drawingPreview: Drawing[] = [];
  isLoaded = false;
  numPages=0

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
          console.log(drawings)
          this.numPages=drawings.length
          this.dataSource.data = drawings;
          console.log(this.dataSource.filteredData)


          this.drawingPreview = drawings;
          this.isLoaded = true;

          this.dataSource.filter = '';
        });
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.isLoaded = false;
      this.openDrawingService.reset();
    });
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = ((data: Drawing) => this.tagService.containsTag(data, this.selectedTags));
    this.dataObs = this.dataSource.connect();

  }

  ngOnDestroy(): void {

    if (this.dataSource) { this.dataSource.disconnect(); }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  get tagCtrl(): FormControl {
    return this.openDrawingService.tagCtrl;
  }
  get filteredTags(): Observable<string[]> {
    return this.openDrawingService.filteredTags;
  }
  get selectedTags(): string[] {
    return this.openDrawingService.selectedTags;
  }
  get allTags(): string[] {
    return this.openDrawingService.allTags;

  }
  get selectedDrawing(): Drawing | null {
    return this.openDrawingService.selectedDrawing;
  }

  getBackground(drawing: Drawing): string {
    return this.openDrawingService.getBackground(drawing);
  }

  getThumbnail(drawingObject: Drawing) {
    const container: HTMLElement | null = document.getElementById(drawingObject.name);
    if (container) {
      const svgThumbnail: Element | null = container.children.item(0);

      if (svgThumbnail) {
        this.renderer.setAttribute(svgThumbnail, 'viewBox', `0 0 ${drawingObject.width} ${drawingObject.height}`);

        svgThumbnail.innerHTML = `${drawingObject.svg}`;
      }
    }
  }

  getBackgroundSelected(drawing: Drawing): string {
    return this.openDrawingService.getBackgroundSelected(drawing);
  }

  test() {
    this.dataSource.filter = Math.random().toString();
  }

  selectDrawing(drawing: Drawing) {
    this.openDrawingService.selectDrawing(drawing);
  }

  // ouvre un nouveau dessin  avec l'ancien drawing
  accept(): void {
      this.openDrawingService.accept(this.dialogRef, this.matAutocomplete.isOpen);
  }

  openDrawing(): void {
    this.openDrawingService.openDrawing(this.dialogRef, this.matAutocomplete.isOpen);
  }

  close(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    this.openDrawingService.add(event, this.matAutocomplete.isOpen);
    this.dataSource.filter = this.openDrawingService.selectedTags.toString();
  }

  remove(tag: string): void {
    this.openDrawingService.remove(tag);
    this.dataSource.filter = this.openDrawingService.selectedTags.toString();
  }
  // Selecting a tag from suggestion
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('Select Tag');
    this.openDrawingService.selectTag(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.dataSource.filter = this.openDrawingService.selectedTags.toString();
  }

}
