import { RGBA } from '../../model/rgba.model';
import { IObjects } from '../IObjects';
import { Point } from '../../model/point.model';
import { ITexture } from '../../textures/ITexture';

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
    texture: ITexture | null;

    constructor(point: Point, strokeWidth: number, texture: ITexture | null = null) {
        this.strokeWidth = strokeWidth;
        this.texture = texture;
        this.x = point.x;
        this.y = point.y;
        this.addPoint(point);
    }

    addPoint(point: Point) {
        this.pointsList.push(point);
        this.resetSize();
    }

    /// Vérification de la hauteur et largeur rectangulaire
    private resetSize() {
        for (const p of this.pointsList) {
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
        }
    }

    draw(): string {
        let polyline = ''; let stroke: string; let fill: string; let filter: string | null = null;
        if (this.texture) {
            polyline = this.texture.getPattern(this.primaryColor, this.secondaryColor, this.id, this.pointsList[0].x, this.pointsList[0].y);
            stroke = `stroke="url(#${this.texture.getName(this.id)})"`;
            fill = `fill="url(#${this.texture.getName(this.id)})"`;
            filter = this.texture.getFilter(this.id);
            if (filter) {
                polyline += filter;
                filter = `filter="url(#${this.texture.getName(this.id)}-filter)"`;
            }
        } else {
            stroke = `stroke="rgb(${this.primaryColor.rgb.r},${this.primaryColor.rgb.g},${this.primaryColor.rgb.b})"`;
            fill = `fill="rgb(${this.primaryColor.rgb.r},${this.primaryColor.rgb.g},${this.primaryColor.rgb.b})"`;
        }

        if (!filter) {
            filter = '';
        }
        if (this.pointsList.length <= 1) {
            polyline += `<circle id="${this.id}" cx="${this.x}" cy="${this.y}" r="${this.strokeWidth / 2}" ${fill} ${filter}/>\n`;
        } else {
            polyline += `<polyline id="${this.id}" fill="none" stroke-width="${this.strokeWidth}"
 ${stroke} ${filter} stroke-linecap="round" stroke-linejoin="round" points="`;
            for (const point of this.pointsList) {
                polyline += `${point.x} ${point.y},`;
            }
            polyline += '"/>\n';
        }
        return polyline;
    }
}
