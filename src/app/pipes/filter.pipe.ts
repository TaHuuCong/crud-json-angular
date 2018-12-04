import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterName'
})

export class FilterPipe implements PipeTransform {
    transform(countries: any, key: any): any {
        if (key === undefined) {
            return countries;
        }
        return countries.filter(country => {
            return country.name.toLowerCase().includes(key.toLowerCase());
        });
    }
}
