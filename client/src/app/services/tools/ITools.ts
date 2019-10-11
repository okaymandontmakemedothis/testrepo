import { ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/// Interface pour tous les outils
export interface ITools {
    readonly id: number;
    readonly faIcon: IconDefinition;
    readonly toolName: string;
    parameters: FormGroup;
    onPressed(event: MouseEvent, renderer: Renderer2): ElementRef | null;
    onRelease(event: MouseEvent, renderer: Renderer2): void;
    onMove(event: MouseEvent, renderer: Renderer2): void;
}
