import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    id: number;
    name: string;
    onPressed($event: MouseEvent): string;
    onRelease($event: MouseEvent): string;
    onMove($event: MouseEvent): string;
}
