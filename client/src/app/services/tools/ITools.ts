import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IObjects } from 'src/app/objects/IObjects';
import { Renderer2 } from '@angular/core';

/// Interface pour tous les outils
export interface ITools {
    readonly id: number;
    readonly faIcon: IconDefinition;
    readonly toolName: string;
    parameters: FormGroup;
    onPressed(event: MouseEvent, renderer: Renderer2): IObjects | null;
    onRelease(event: MouseEvent, renderer: Renderer2): void;
    onMove(event: MouseEvent, renderer: Renderer2): void;
}
