import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { countryRoute } from './country.route';
import { CountryService } from './country.service';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

import { LibModule } from '../lib.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { FilterPipe } from '../pipes/filter.pipe';

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'left',
            distance: 12
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'fade',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
    declarations: [
        CountryListComponent,
        CountryDetailComponent,
        FilterPipe
    ],
    imports: [
        RouterModule.forChild(countryRoute),
        LibModule,
        NotifierModule.withConfig(customNotifierOptions),
    ],
    providers: [
        CountryService,
    ],
})
export class CountryModule { }
