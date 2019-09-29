import {
  AfterViewInit, Component, ElementRef, HostListener,
  OnInit, ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';

@Component({
  selector: 'app-color-opacity',
  templateUrl: './color-opacity.component.html',
  styleUrls: ['./color-opacity.component.scss'],
})
export class ColorOpacityComponent implements AfterViewInit, OnInit {

  @ViewChild('canvas', { static: false })
  opacityCanvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedWidth: number;

  constructor(private colorTransformer: ColorTransformerService, private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.hsl.valueChanges.subscribe((): void => this.draw());
    this.a.valueChanges.subscribe((alpha: number): void => {
      this.selectedWidth = this.opacityCanvas.nativeElement.width * alpha;
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.selectedWidth = this.opacityCanvas.nativeElement.width;
    this.draw();
  }

  /// Obtenir le form control pour la valeur du hsl pour le service
  get hsl(): FormGroup {
    return this.colorPickerService.hsl;
  }

  /// Obtenir le form control pour la valeur de l'alpha du service
  get a(): FormControl {
    return this.colorPickerService.a;
  }

  /// Cette section de code est inspiré de : https://malcoded.com/posts/angular-color-picker/
  draw(): void {
    if (!this.ctx) {
      this.ctx = this.opacityCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.opacityCanvas.nativeElement.width;
    const height = this.opacityCanvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const squareSize = height / 6;
    for (let dx = 0; dx <= width; dx += squareSize * 2) {
      for (let dy = 0; dy <= height; dy += squareSize * 2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.rect(dx, dy, squareSize, squareSize);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
    for (let dx = squareSize; dx <= width; dx += squareSize * 2) {
      for (let dy = squareSize; dy <= height; dy += squareSize * 2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.rect(dx, dy, squareSize, squareSize);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }

    const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
    const rgb = this.colorTransformer.hsl2rgb({
      h: (this.hsl.get('h') as FormControl).value,
      s: (this.hsl.get('s') as FormControl).value,
      l: (this.hsl.get('l') as FormControl).value,
    });

    gradient.addColorStop(0, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0)' || 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)' || 'rgba(0,0,0,0)');
    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectedWidth) {
      this.ctx.beginPath();
      const perc = (1 - (this.selectedWidth / width));
      const colorValue = (255 - Math.floor(255 * perc * 0.9));
      this.ctx.strokeStyle = 'rgba(' + colorValue + ', ' + colorValue + ',' + colorValue + ', 1) ';
      this.ctx.lineWidth = 3;
      this.ctx.rect(this.selectedWidth - 3, 0, 3 * 2, height);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  /// Change la valeur de l'alpha dans le service pour la valeur a la position courrante
  private updateOpacity(y: number): void {
    const opacityValue = this.getOpacityAtPosition(y);
    this.a.setValue(opacityValue);
  }

  /// Retourne le pourcentage de l'opacité selon la position de x dans l'élément
  private getOpacityAtPosition(x: number): number {
    if (x > this.opacityCanvas.nativeElement.width) {
      x = this.opacityCanvas.nativeElement.width;
    }
    if (x < 0) {
      x = 0;
    }
    const percentage = Math.round(x / this.opacityCanvas.nativeElement.width * 100) / 100;
    return percentage;
  }

  /// Éffectuer
  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      this.selectedWidth = event.offsetX;
      this.updateOpacity(event.offsetX);
      this.draw();
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.selectedWidth = event.offsetX;
    this.updateOpacity(event.offsetX);
    this.draw();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent): void {
    this.isMouseDown = false;
  }
}
