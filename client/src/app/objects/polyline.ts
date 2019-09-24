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
        polyline += '<circle id="' + this.id + '" cx="' + this.pointsList[0].x +
            '" cy="' + this.pointsList[0].y +
            '" r="' + this.strokeWidth / 2 +
            '" fill="' + this.rgbString +
            '"/>\n';
        polyline += '<polyline id="' + this.id +
            '" fill="none" stroke-width="' + this.strokeWidth +
            '" stroke="' + this.rgbString +
            '" points="';
        for (const point of this.pointsList) {
            polyline += (point.x + ' ' + point.y + ',');
        }
        polyline += '"/>\n';
        polyline += '<circle id="' + this.id +
            '" cx="' + this.pointsList[this.pointsList.length - 1].x +
            '" cy="' + this.pointsList[this.pointsList.length - 1].y +
            '" r="' + this.strokeWidth / 2 +
            '" fill="' + this.rgbString + '"/>';
        return polyline;
    }


}