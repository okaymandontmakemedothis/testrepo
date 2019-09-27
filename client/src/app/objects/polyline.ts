import { RGBA } from '../model/rgba.model';
import { IObjects } from './IObjects';

export interface Point {
    x: number;
    y: number;
}

export class Polyline implements IObjects {
    id: number;
    x: number;
    y: number;
    height = 0;
    width = 0;
    primaryColor: RGBA;
    secondaryColor: RGBA;
    pointsList: Point[] = [];
    strokeWidth: number;

    constructor(point: Point, strokeWidth: number) {
        this.strokeWidth = strokeWidth;
        this.addPoint(point);
    }

    get rgbString(): string {
        return 'rgb('
            + this.primaryColor.rgb.r
            + ',' + this.primaryColor.rgb.g
            + ',' + this.primaryColor.rgb.b
            + ')';
    }

    addPoint(point: Point) {
        this.pointsList.push(point);
        this.resetSize();
    }
    /// Vérification de la hauteur et largeur rectangulaire
    private resetSize() {
        for (const p of this.pointsList) {
            if (this.x && this.y) {
                if (p.x < this.x) {
                    this.x = p.x;
                }
                if (p.y < this.y) {
                    this.y = p.y;
                }
                if (p.y > this.height) {
                    this.height = this.y;
                }
                if (p.x > this.width) {
                    this.width = this.x;
                }
            } else {
                this.x = p.x;
                this.y = p.y;
            }
        }
    }

    draw(): string {
        let polyline = '';
        if (this.pointsList.length < 2) {
            polyline += '<circle id="' + this.id + '" cx="' + this.lastPoint.x +
                '" cy="' + this.lastPoint.y +
                '" r="' + this.strokeWidth / 2 +
                '" fill="' + this.rgbString +
                '" fill-opacity="' + this.primaryColor.a +
                '"/>\n';
        } else {
            polyline += '<polyline id="' + this.id +
                '" fill="none" stroke-width="' + this.strokeWidth +
                '" stroke-opacity="' + this.primaryColor.a +
                '" stroke="' + this.rgbString +
                '" stroke-linecap="round" stroke-linejoin="round" points="';
            for (const point of this.pointsList) {
                polyline += (point.x + ' ' + point.y + ',');
            }
            polyline += '"/>\n';
        }
        return polyline;
    }
}
