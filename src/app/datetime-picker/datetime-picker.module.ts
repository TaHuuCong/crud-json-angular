import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DatetimePickerComponent } from './datetime-picker.component';
import { LibModule } from '../lib.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
    declarations: [
        DatetimePickerComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'datetime-picker', component: DatetimePickerComponent }
        ]),
        LibModule,
        NgZorroAntdModule,
        NgxDaterangepickerMd
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US }
    ],
})
export class DatetimePickerModule { }
