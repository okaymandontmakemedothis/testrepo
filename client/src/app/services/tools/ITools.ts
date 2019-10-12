import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/// Interface pour tous les outils
export interface ITools {
    readonly id: number;
    readonly faIcon: IconDefinition;
    readonly toolName: string;
    parameters: FormGroup;
    onPressed(event: MouseEvent): void;
    onRelease(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
}
