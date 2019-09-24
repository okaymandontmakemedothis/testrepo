import { IObjects } from 'src/app/objects/IObjects';
import { FormGroup } from '@angular/forms';

export interface ITools {
    id: number;
    parameters: FormGroup;
    onPressed(event: MouseEvent): IObjects;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
}
