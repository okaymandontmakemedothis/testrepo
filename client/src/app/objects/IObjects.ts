export interface IObjects {
    id:number;
    svgLine:string;
    draw($event:MouseEvent):string;
    getColor():void;
}
