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
    height: number;
    width: number;
    primaryColor: RGBA;
    secondaryColor: RGBA;
    pointsList: Point[] = [];
    strokeWidth: number;
    lastPoint: Point;

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

    addPoint(dpoint: Point) {
        if (this.lastPoint) {
            this.lastPoint = { x: this.lastPoint.x + dpoint.x, y: this.lastPoint.y + dpoint.y };
        } else {
            this.lastPoint = dpoint;
        }
        this.pointsList.push(this.lastPoint);
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
