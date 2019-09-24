import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    id: number;
    faIcon: IconDefinition;
    parameters: FormGroup;
    onPressed(event: MouseEvent): IObjects;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
}
