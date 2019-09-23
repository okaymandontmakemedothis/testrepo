export interface IObjects {
    id: number;
    x: number
    y: number
    height: number
    width: number
    draw($event: MouseEvent): string;
    primaryColor: RGBA;
    secondaryColor: RGBA;
}