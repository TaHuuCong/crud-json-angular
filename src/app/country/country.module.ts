import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { countryRoute } from './country.route';
import { CountryService } from './country.service';
import { CountryComponent } from './country.component';

@NgModule({
    declarations: [
        CountryComponent
    ],
    imports: [RouterModule.forChild(countryRoute)],
    exports: [RouterModule],
    providers: [
        CountryService,
    ],
})
export class CountryModule { }
