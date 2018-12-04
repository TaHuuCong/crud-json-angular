import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const countryRoute: Routes = [
    { path: 'country/list', component: CountryListComponent },
    { path: 'country/:id/:operation', component: CountryDetailComponent }
];
