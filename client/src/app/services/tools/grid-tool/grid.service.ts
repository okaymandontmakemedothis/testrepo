import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_CELL_SIZE, INITIAL_TRANSPARENCE } from '../tools-constants';
// import { NewDrawingService } from '../new-drawing/new-drawing.service';

@Injectable({
    providedIn: 'root',
})
export class GridService implements ITools {

    readonly id = ToolIdConstants.GRID_ID;
    readonly faIcon: IconDefinition = faBorderAll;
    readonly toolName = 'Grille';
    parameters: FormGroup;
    sizeCell: FormControl;
    activerGrille: FormControl;
    transparence: FormControl;
    color: FormControl;
    object: SVGLineElement | null;
    x: number;
    y: number;
    screenSizeX: number;
    screenSizeY: number;
    rect: SVGRectElement;
    path: SVGPathElement;
    pattern: SVGPatternElement;
    form: FormGroup;

    constructor(private drawingService: DrawingService, ) { // private newDrawingService: NewDrawingService) {
        this.sizeCell = new FormControl(INITIAL_CELL_SIZE, Validators.min(1));
        this.transparence = new FormControl(INITIAL_TRANSPARENCE, Validators.min(0.1));
        this.activerGrille = new FormControl(false);
        this.color = new FormControl('black');
        this.parameters = new FormGroup({
            sizeCell: this.sizeCell,
            transparence: this.transparence,
            activerGrille: this.activerGrille,
            color: this.color,
        });
        this.screenSizeX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenSizeY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    onPressed(event: MouseEvent) {
        // this.createPatternGrid();
    }
    onRelease(event: MouseEvent) {
        return;
    }
    onMove(event: MouseEvent) {
        return null;
    }

    // tslint:disable-next-line: no-empty
    onKeyDown(event: KeyboardEvent): void { }

    // tslint:disable-next-line: no-empty
    onKeyUp(event: KeyboardEvent): void { }

    createPatternGrid() {
        this.x = 0;
        this.y = 0;
        const grid: SVGDefsElement = this.drawingService.renderer.createElement('defs', 'svg');
        this.drawingService.renderer.setAttribute(grid, 'pointer-events', 'none');

        this.pattern = this.drawingService.renderer.createElement('pattern', 'svg');
        this.drawingService.renderer.setProperty(this.pattern, 'id', 'Pattern');
        this.drawingService.renderer.setAttribute(this.pattern, 'width', (this.sizeCell.value).toString());
        this.drawingService.renderer.setAttribute(this.pattern, 'height', (this.sizeCell.value).toString());
        this.drawingService.renderer.setAttribute(this.pattern, 'patternUnits', 'userSpaceOnUse');
        this.drawingService.renderer.setAttribute(this.pattern, 'x', this.x.toString());
        this.drawingService.renderer.setAttribute(this.pattern, 'y', this.y.toString());

        this.rect = this.drawingService.renderer.createElement('rect', 'svg');
        this.drawingService.renderer.setAttribute(this.rect, 'x', this.x.toString());
        this.drawingService.renderer.setAttribute(this.rect, 'y', this.y.toString());
        this.drawingService.renderer.setAttribute(this.rect, 'width', this.sizeCell.value.toString());
        this.drawingService.renderer.setAttribute(this.rect, 'height', this.sizeCell.value.toString());
        this.drawingService.renderer.setAttribute(this.rect, 'pointer-events', 'none');
        this.setStyle();
        this.drawingService.renderer.appendChild(grid, this.pattern);

        this.drawingService.renderer.appendChild(this.pattern, this.rect);

        const overallRect: SVGRectElement = this.drawingService.renderer.createElement('rect', 'svg');

        this.drawingService.renderer.setStyle(overallRect, 'fill', 'url(#Pattern)');
        this.drawingService.renderer.setAttribute(overallRect, 'pointer-events', 'none');
        this.drawingService.renderer.setAttribute(overallRect, 'width', this.screenSizeX.toString());
        this.drawingService.renderer.setAttribute(overallRect, 'height', this.screenSizeY.toString());

        this.drawingService.addObject(overallRect);
        this.drawingService.addObject(grid);
    }

    private setStyle() {
        this.drawingService.renderer.setStyle(this.rect, 'fill', 'none');
        this.drawingService.renderer.setStyle(this.rect, 'stroke', this.color.value);
        this.drawingService.renderer.setStyle(this.rect, 'stroke-width', '1');
        this.drawingService.renderer.setStyle(this.rect, 'stroke-opacity', this.transparence.value.toString());
        this.hideGrid();
    }

    hideGrid() {
        this.drawingService.renderer.setStyle(this.rect, 'visibility', 'hidden');
    }

    showGrid() {
        this.drawingService.renderer.setStyle(this.rect, 'visibility', 'visible');
    }

    changeGridSize() {
        this.drawingService.renderer.setAttribute(this.pattern, 'width', (this.sizeCell.value).toString());
        this.drawingService.renderer.setAttribute(this.pattern, 'height', (this.sizeCell.value).toString());
        this.drawingService.renderer.setAttribute(this.rect, 'width', this.sizeCell.value.toString());
        this.drawingService.renderer.setAttribute(this.rect, 'height', this.sizeCell.value.toString());
    }

    changeOpacity() {
        this.drawingService.renderer.setStyle(this.rect, 'stroke-opacity', this.transparence.value.toString());
    }

    changeColor() {
        this.drawingService.renderer.setStyle(this.rect, 'stroke', this.color.value);
    }
}
