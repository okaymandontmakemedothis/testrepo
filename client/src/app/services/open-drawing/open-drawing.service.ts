import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { Drawing } from '../../../../../common/communication/drawing';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { RGBA } from 'src/app/model/rgba.model';
// import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class OpenDrawingService {
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }
  getDrawings(): Observable<Drawing[]> {
    console.log('called');
    return this.http.get<Drawing[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(() => of([])),
    );

  }
  getBackground(drawing: Drawing): string {
    const rgba: RGBA = drawing.backGroundColor;
    return `rgba(${rgba.rgb.r},${rgba.rgb.g},${rgba.rgb.b},${rgba.a})`;
  }
  // getThumbnail(drawingObject: Drawing) {
  //   const container: HTMLElement | null = document.getElementById(drawingObject.name);
  //   if (container) {
  //     const svgThumbnail: Element | null = container.children.item(0);

  //     if (svgThumbnail) {
  //       this.renderer.setAttribute(svgThumbnail, 'viewBox', `0 0 ${drawingObject.width} ${drawingObject.height}`);

  //       svgThumbnail.innerHTML = `${drawingObject.svg}`;
  //     }
  //   }
  // }



}
