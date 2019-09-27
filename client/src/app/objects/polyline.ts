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
    texture: number;

    constructor(point: Point, strokeWidth: number, texture: number = 0) {
        this.strokeWidth = strokeWidth;
        this.texture = texture;
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

    private getTextureString(): { fillString: string, strokeString: string, patternString: string } {
        let fillString = '';
        let strokeString = '';
        let patternString = '';
        switch (this.texture) {
            case 0:
                fillString = '" fill="' + this.rgbString +
                    '" fill-opacity="' + this.primaryColor.a + '"';
                strokeString = '" stroke-opacity="' + this.primaryColor.a +
                    '" stroke="' + this.rgbString + '" stroke-linecap="round" stroke-linejoin="round"';
                break;
            case 1:
                patternString = `<defs>
                <pattern id="polka-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle fill="#bee9e8" cx="50" cy="50" r="25">
                    </circle>
                </pattern>
                </defs>`;
                fillString = '" fill="url(#polka-dots)' +
                    '" fill-opacity="' + this.primaryColor.a + '"';
                strokeString = '" stroke-opacity="' + this.primaryColor.a +
                    '" stroke="url(#polka-dots)" stroke-linecap="round" stroke-linejoin="round"';
                break;
            case 2:
                patternString = `<defs>
                <pattern id="pattern-2" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="flipped-diamonds" fill="#000000">
                            <polygon id="Combined-Shape" points="8 -4.4408921e-16 8 20 0 10"></polygon>
                            <polygon id="Combined-Shape-Copy" points="16 0 16 10 8 0"></polygon>
                            <polygon id="Combined-Shape-Copy-2" points="16 10 16 20 8 20"></polygon>
                        </g>
                    </g>
                    </pattern>
                </defs>`;
                fillString = '" fill="url(#pattern-2)' +
                    '" fill-opacity="' + this.primaryColor.a + '"';
                strokeString = '" stroke-opacity="' + this.primaryColor.a +
                    '" stroke="url(#pattern-2)" stroke-linecap="round" stroke-linejoin="round"';
            default:
                break;
        }

        return { fillString, strokeString, patternString };
    }

    draw(): string {
        const paramStrings: { fillString: string, strokeString: string, patternString: string } = this.getTextureString();

        let polyline = paramStrings.patternString;
        if (this.pointsList.length < 2) {
            polyline += '<circle id="' + this.id + '" cx="' + this.lastPoint.x +
                '" cy="' + this.lastPoint.y +
                '" r="' + this.strokeWidth / 2 +
                paramStrings.fillString +
                '/>\n';
        } else {
            polyline += '<polyline id="' + this.id +
                '" fill="none" stroke-width="' + this.strokeWidth +
                paramStrings.strokeString +
                'points="';
            for (const point of this.pointsList) {
                polyline += (point.x + ' ' + point.y + ',');
            }
            polyline += '"/>\n';
        }
        return polyline;
    }
}
