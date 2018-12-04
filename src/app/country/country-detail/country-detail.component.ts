import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../country';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  country: Country;
  operation: string;
  countryForm: FormGroup;
  continents = ['Asia', 'America', 'Europe', 'Australia', 'Africa'];
  submitted = false;
  countries: any;
  isSuccess = false;
  successMsg = 'New country has been added.';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  formInit() {
    this.countryForm = this.fb.group({
      id: [],
      // name: ['', [Validators.required]],
      name: ['', [Validators.required], this.uniqueNameValidator.bind(this)],
      acreage: ['', [Validators.required]],
      population: ['', [Validators.required]],
      continent: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    if (this.operation === 'create') {
      this.formInit();
    } else {
      this.formInit();

      this.countryService.getCountryById(this.route.snapshot.params['id']).subscribe(
        data => {
          this.country = data;
          this.countryForm.patchValue(data);
        }
      );
    }
  }

  onBack() {
    this.router.navigateByUrl('/country/list');
  }

  onEdit(id) {
    this.operation = 'edit';
    this.router.navigateByUrl('/country/' + id + '/edit');
  }

  onDelete(id) {
    if (confirm('Are you sure you want to delete this country?')) {
      this.countryService.deleteCountry(id).subscribe(
        data => {
          this.router.navigateByUrl('/country/list');
        },
      );
    }
  }

  onUpdate() {
    this.submitted = true;
    if (this.countryForm.valid) {
      this.countryService.updateCountry(this.countryForm.value).subscribe(
        data => {
          this.router.navigateByUrl('/country/list');
        },
      );
    }
  }

  onCreate() {
    this.submitted = true;
    if (this.countryForm.valid) {
      this.countryService.addNewCountry(this.countryForm.value).subscribe(
        data => {
          this.isSuccess = true;
          this.router.navigateByUrl('/country/list');
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
