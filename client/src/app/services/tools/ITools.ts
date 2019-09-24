import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    id: number;
    name: string;
    onPressed($event: MouseEvent): IObjects;
    onRelease($event: MouseEvent): string;
    onMove($event: MouseEvent): string;
}
