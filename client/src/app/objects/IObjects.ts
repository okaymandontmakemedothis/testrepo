import { RGBA } from '../model/rgba.model';

/// Interface pour tous les objets
export interface IObjects {
    id: number;
    x: number;
    y: number;
    height: number;
    width: number;
    strokeWidth: number;
    primaryColor: RGBA;
    secondaryColor: RGBA;
    draw(): string;
}
