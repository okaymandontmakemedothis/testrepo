import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/app.material-modules';
import { WelcomeDialogComponent } from './welcome-dialog.component';

@NgModule({
    imports: [CommonModule, MaterialModules, FormsModule, ReactiveFormsModule],
    declarations: [WelcomeDialogComponent, ],
    exports: [WelcomeDialogComponent],
    entryComponents: [],
})

export class WelcomeDialogModule { }