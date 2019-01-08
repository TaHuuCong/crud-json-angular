import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEditorContentChange = new EventEmitter();

  country: Country;
  operation: string;
  id: string;
  countryForm: FormGroup;
  continents = ['Asia', 'America', 'Europe', 'Australia', 'Africa'];
  submitted = false;
  countries: any;
  isSuccess = false;
  successMsg = 'New country has been added.';

  // editor
  editor;
  isChange = false;
  editorContent = '';
  editorLength = 0;
  errorEMax = false;
  errorEMin = false;
  initEditor = {
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap preview hr',
      'searchreplace',
      'media save contextmenu directionality',
      'paste textcolor colorpicker textpattern imagetools'
    ],
    toolbar1: `insertfile undo redo | styleselect | bold italic underline forecolor backcolor |
    | alignleft aligncenter alignright alignjustify | bullist numlist | link image media`,
    // toolbar2: 'print preview code ',
    branding: false,
    visual: false,
    height: 250,
    setup: editor => {
      this.editor = editor;
      editor.on('keyup change', () => {
        const length = editor.getBody().textContent.length;
        const lengthTrim = editor.getBody().textContent.trim().length;
        this.onEditorContentChange.emit(length);
        this.errorEMax = (lengthTrim > 3000) ? true : false;
        this.errorEMin = (length === 0) ? true : false;

        const childNode = editor.getBody().childNodes[0];
        const nodeName = childNode.tagName.toLowerCase();
        const nodeHTML = childNode.innerHTML.replace(/^[\s(&nbsp;)]+/g, '').replace(/[\s(&nbsp;)]+$/g, '');
        this.editorContent = `<` + nodeName + `>` + nodeHTML + `</` + nodeName + `>`;
      });
    }
  };

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private fb: FormBuilder,
    private router: Router
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
                  this.editorContent = data.describe;
                  this.countryForm.patchValue(data);
              },
              error => {}
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
      continent: ['', [Validators.required]],
      describe: [''],
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

  // onDelete() {
  //   if (confirm('Are you sure you want to delete this country?')) {
  //     this.countryService.deleteCountry(this.id).subscribe(
  //       data => {
  //         this.router.navigateByUrl('/country/list');
  //       },
  //     );
  //   }
  // }

  onUpdate() {
    this.submitted = true;
    if (this.countryForm.value.describe === '') {
      this.errorEMin = true;
    }
    if (this.errorEMin === false && this.countryForm.valid) {
      this.countryForm.value.describe = this.editorContent;
      this.countryService.updateCountry(this.countryForm.value).subscribe(
        data => {
          this.router.navigateByUrl('/country/' + data.id + '/details');
        },
      );
    }
  }

  onCreate() {
    this.submitted = true;
    if (this.countryForm.value.describe === '') {
      this.errorEMin = true;
    }
    if (this.errorEMin === false && this.countryForm.valid) {
      this.countryForm.value.describe = this.editorContent;
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

  handleEditor(event) {
    // const childNode = event.editor.getBody().childNodes[0];
    // const nodeName = childNode.tagName.toLowerCase();
    // const nodeHTML = childNode.innerHTML.replace(/^[\s(&nbsp;)]+/g, '').replace(/[\s(&nbsp;)]+$/g, '');
    // this.editorContent = `<` + nodeName + `>` + nodeHTML + `</` + nodeName + `>`;
  }
}
