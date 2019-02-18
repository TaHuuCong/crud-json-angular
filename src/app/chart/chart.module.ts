import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibModule } from '../lib.module';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { chartRoute } from './chart.route';
import { ChartService } from './chart.service';

@NgModule({
    declarations: [
        ChartjsComponent
    ],
    imports: [
        RouterModule.forChild(chartRoute),
        LibModule
    ],
    providers: [
        ChartService,
    ],
})
export class ChartModule { }
