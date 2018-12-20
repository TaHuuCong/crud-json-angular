import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DatetimePickerComponent } from './datetime-picker.component';
// import { LibModule } from '../lib.module';
// import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { LibModule } from '../lib.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormatUtcTime } from './date.pipe';

@NgModule({
    declarations: [
        DatetimePickerComponent,
        FormatUtcTime
    ],
    imports: [
        RouterModule.forChild([
            { path: 'datetime-picker', component: DatetimePickerComponent }
        ]),
        // NgZorroAntdModule,
        BrowserModule,
        NoopAnimationsModule,
        LibModule,
    ],
    // providers: [
    //     { provide: NZ_I18N, useValue: en_US }
    // ],
})
export class DatetimePickerModule { }
