import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibModule } from '../lib.module';
import { formRoute } from './form.route';
import { TableFormComponent } from './table-form-multi-field/table-form.component';

@NgModule({
    declarations: [
        TableFormComponent,
    ],
    imports: [
        RouterModule.forChild(formRoute),
        LibModule,
    ],
    providers: [
    ],
})
export class MyFormModule { }
