import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    id: number;
<<<<<<< HEAD
    name: string;
    onPressed($event: MouseEvent): string;
    onRelease($event: MouseEvent): string;
    onMove($event: MouseEvent): string;
=======
    onPressed(event: MouseEvent): IObjects;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
>>>>>>> master
}
