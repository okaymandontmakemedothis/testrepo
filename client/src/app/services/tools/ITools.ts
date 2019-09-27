import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IObjects } from 'src/app/objects/IObjects';

export interface ITools {
    readonly id: number;
    faIcon: IconDefinition;
    toolName: string;
    parameters: FormGroup;
    onPressed(event: MouseEvent): IObjects | null;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
}
