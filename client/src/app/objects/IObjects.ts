import { RGBA } from '../model/rgba.model';

export interface IObjects {
    id: number;
    x: number;
    y: number;
    height: number;
    width: number;
    primaryColor: RGBA;
    secondaryColor: RGBA;
    draw($event: MouseEvent | void): string;
}
