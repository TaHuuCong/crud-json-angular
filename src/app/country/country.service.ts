import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from '../country/country';

const BASE_URL = 'http://localhost:1234/countries';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor(
        private http: HttpClient
    ) { }

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${BASE_URL}`);
    }

    getCountryById(id): Observable<Country> {
        return this.http.get<Country>(`${BASE_URL}/${id}`);
    }

    getCountryByName(name: string) {
        // return this.http.get<any[]>(`${BASE_URL}?name=${name}`);

        // use HttpParams
        return this.http.get<any[]>(`${BASE_URL}`, {
            params: new HttpParams().set('name', name)
        });
    }

    addNewCountry(country: Country): Observable<any> {
        return this.http.post(`${BASE_URL}`, country);
    }

    deleteCountry(id): Observable<any> {
        return this.http.delete(`${BASE_URL}/${id}`);
    }

    updateCountry(country: Country): Observable<any> {
        return this.http.put(`${BASE_URL}/` + country.id, country);
    }
}
