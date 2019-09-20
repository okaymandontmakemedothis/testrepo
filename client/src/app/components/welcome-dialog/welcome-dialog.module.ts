import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { WelcomeDialogComponent } from './welcome-dialog.component';

@NgModule({
    imports:[CommonModule],
    declarations:[WelcomeDialogComponent],
    exports:[WelcomeDialogComponent],
})

export class WelcomeDialogModule{}