import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    id: number;
    onPressed(event: MouseEvent): IObjects;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
}
