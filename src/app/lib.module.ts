import { NgModule } from '@angular/core';
import {
    MatFormFieldModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatInputModule, MatCheckboxModule, MatToolbarModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { NotifierModule, NotifierOptions } from 'angular-notifier';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    NgxDaterangepickerMd,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...MODULES
    ]
})
export class LibModule { }
