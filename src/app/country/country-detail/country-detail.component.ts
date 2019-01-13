import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../country';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  country: Country;
  operation: string;
  id: string;
  countryForm: FormGroup;
  continents = ['Asia', 'America', 'Europe', 'Australia', 'Africa'];
  submitted = false;
  countries: any;
  isSuccess = false;
  successMsg = 'New country has been added.';
  viewName = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private fb: FormBuilder,
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) {
    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.id = params['id'];

      if (this.operation === 'create') {
        this.formInit();
      } else {
        this.formInit();
        if (this.id === '-1') {
        } else {
          this.countryService.getCountryById(this.id).subscribe(
            data => {
              this.viewName = data.name;
              this.countryForm.patchValue(data);
            },
            error => { }
          );
        }
      }
    });
  }

  formInit() {
    this.countryForm = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      // name: ['', [Validators.required], this.uniqueNameValidator.bind(this)],
      acreage: ['', [Validators.required]],
      population: ['', [Validators.required]],
      continent: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onBack() {
    this.router.navigateByUrl('/country/list');
  }

  onEdit() {
    this.router.navigateByUrl('/country/' + this.id + '/edit');
  }

  onUpdate() {
    this.submitted = true;
    if (this.countryForm.valid) {
      this.countryService.updateCountry(this.countryForm.value).subscribe(
        data => {
          this.router.navigateByUrl('/country/' + data.id + '/details');
        },
      );
    }
  }

  onCreate() {
    if (this.countryForm.valid) {
      this.countryService.addNewCountry(this.countryForm.value).subscribe(
        data => {
          this.isSuccess = true;
          this.router.navigateByUrl('/country/' + data.id + '/details');
        },
      );
    }
  }

  onReset() {
    this.countryForm.reset();
  }

  uniqueNameValidator(c: AbstractControl) {
    return this.countryService.getCountryByName(c.value).pipe(
      map(countries => {
        return countries && countries.length > 0 ? { uniqueName: true } : null;
      })
    );
  }
}
