import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  copyCountries: Country[] = [];
  isActive = false;
  searchField: FormControl;
  arr = [0, 0, 0, 0, 0, 0];

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {
    countryService.getAllCountries().subscribe(
      (data) => this.countries = data,
      (error) => console.log('error'),
      () => this.copyCountries = this.countries
    );
  }

  ngOnInit() {
    this.searchField = new FormControl();
  }

  onCreate() {
    this.router.navigate(['country/0/create']);
  }

  onDelete(id) {
    if (confirm('Are you sure you want to delete this country?')) {
      this.countryService.deleteCountry(id).subscribe(
        data => {
          window.location.reload();
        },
      );
    }
  }

  // use this.countries -> multi-filter
  // use this.copyCountries -> single-filter
  filterBy(filter: string) {
    switch (filter) {
      case 'all':
        this.countries = this.copyCountries;
        break;
      case 'acrgt1':
        this.countries = this.countries.filter(
          country => {
            return country.acreage > 1000000;
          }
        );
        break;
      case 'popgt1':
        this.countries = this.countries.filter(
          country => {
            return country.population > 100000000;
          }
        );
        break;
      case 'asian':
        this.countries = this.countries.filter(
          country => {
            return country.continent.toLowerCase().includes('asia');
          }
        );
        break;
    }
  }

  nameAsc() {
    this.arr = [1, 0, 0, 0, 0, 0];
    this.countries = this.countries.sort(this.dynamicSort('name', 1));
  }

  nameDesc() {
    this.arr = [0, 1, 0, 0, 0, 0];
    this.countries = this.countries.sort(this.dynamicSort('name', -1));
  }

  acreageAsc() {
    this.arr = [0, 0, 1, 0, 0, 0];
    this.countries = this.countries.sort(this.dynamicSort('acreage', 1));
  }

  acreageDesc() {
    this.arr = [0, 0, 0, 1, 0, 0];
    this.countries = this.countries.sort(this.dynamicSort('acreage', -1));
  }

  populationAsc() {
    this.arr = [0, 0, 0, 0, 1, 0];
    this.countries = this.countries.sort(this.dynamicSort('population', 1));
  }

  populationDesc() {
    this.arr = [0, 0, 0, 0, 0, 1];
    this.countries = this.countries.sort(this.dynamicSort('population', -1));
  }

  dynamicSort(property, sortOrder: number) {
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

  onSearchChange(value) {
    if (value === '') {
      this.countries = this.copyCountries;
    }
    this.countries = this.countries.filter(country => {
      return country.name.toLowerCase().includes(value.toLowerCase())
        || country.continent.toLowerCase().includes(value.toLowerCase());
    });
  }

  view(id) {
    this.router.navigateByUrl('country/' + id + '/details');
  }

}
