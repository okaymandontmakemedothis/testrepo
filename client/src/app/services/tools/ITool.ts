export interface ITools {
    id:number;
    onPressed($event:MouseEvent) : string;
    onRelease($event:MouseEvent) : string;
    onMove($event:MouseEvent) : string;
}