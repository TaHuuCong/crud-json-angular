import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { CountryService } from '../country/country.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[uniqueName]',
    // providers: [{ NG_ASYNC_VALIDATORS, useExisting: UniqueNameValidatorDirective, multi: true }]
})

export class UniqueNameValidatorDirective implements AsyncValidator {

    constructor(private countryService: CountryService) { }

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.countryService.getCountryByName(c.value).pipe(
            map(countries => {
                return countries && countries.length > 0 ? { 'uniqueName': true } : null;
            })
        );
    }
}
