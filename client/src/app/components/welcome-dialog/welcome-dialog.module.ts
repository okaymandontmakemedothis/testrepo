import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/app.material-modules';
import { WelcomeDialogComponent } from './welcome-dialog.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    imports: [CommonModule, MaterialModules, FormsModule, ReactiveFormsModule],
    declarations: [WelcomeDialogComponent, DialogComponent],
    exports: [WelcomeDialogComponent],
    entryComponents: [DialogComponent],
})

export class WelcomeDialogModule { }