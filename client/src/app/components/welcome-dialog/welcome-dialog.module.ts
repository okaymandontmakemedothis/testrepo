import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/app.material-modules';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { AideDialogComponent } from './aide-dialog/aide-dialog.component';

@NgModule({
    imports: [CommonModule, MaterialModules, FormsModule, ReactiveFormsModule],
    declarations: [WelcomeDialogComponent, AideDialogComponent],
    entryComponents: [WelcomeDialogComponent, AideDialogComponent],
})

export class WelcomeDialogModule { }