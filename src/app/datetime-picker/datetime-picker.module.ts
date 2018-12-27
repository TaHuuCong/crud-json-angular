import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DatetimePickerComponent } from './datetime-picker.component';
// import { LibModule } from '../lib.module';
// import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LibModule } from '../lib.module';
import { FormatUtcTime } from './date.pipe';
import { DateTimeService } from './datetime.service';

@NgModule({
    declarations: [
        DatetimePickerComponent,
        FormatUtcTime,
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
    providers: [
        DateTimeService,
        // { provide: NZ_I18N, useValue: en_US }
    ],
})
export class DatetimePickerModule { }
